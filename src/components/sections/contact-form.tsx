"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { readContact, validateContact, type ContactResponse } from "@/lib/contact";

type ContactState = { status: "idle" } | ({ status: "done" } & ContactResponse);

const initial: ContactState = { status: "idle" };

/** Valida no navegador e envia para a função da Cloudflare em /api/contact. */
async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const data = readContact(Object.fromEntries(formData));
  const errors = validateContact(data);
  if (Object.keys(errors).length) return { status: "done", ok: false, errors };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = (await res.json().catch(() => null)) as ContactResponse | null;
    return { status: "done", ...(body ?? { ok: false, message: "Não foi possível enviar agora. Tente novamente ou ligue para nós." }) };
  } catch {
    return { status: "done", ok: false, message: "Sem conexão. Verifique sua internet e tente novamente." };
  }
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status !== "done") return;
    if (state.ok) {
      formRef.current?.reset();
      toast.success("Mensagem enviada!", { description: "Retornaremos o contato em breve." });
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const sent = state.status === "done" && state.ok;
  const err = (state.status === "done" && !state.ok && state.errors) || {};

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nome" error={err.name}>
          <Input id="name" name="name" placeholder="Seu nome" autoComplete="name" aria-invalid={!!err.name} required />
        </Field>
        <Field id="phone" label="Telefone" optional error={err.phone}>
          <Input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" autoComplete="tel" aria-invalid={!!err.phone} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="E-mail" error={err.email}>
          <Input id="email" name="email" type="email" placeholder="voce@empresa.com.br" autoComplete="email" aria-invalid={!!err.email} required />
        </Field>
        <Field id="company" label="Empresa" optional>
          <Input id="company" name="company" placeholder="Nome da empresa" autoComplete="organization" />
        </Field>
      </div>
      <Field id="message" label="Mensagem" error={err.message}>
        <Textarea
          id="message"
          name="message"
          placeholder="Quantas picapes, para qual uso e por quanto tempo?"
          aria-invalid={!!err.message}
          required
        />
      </Field>

      <Button type="submit" size="lg" disabled={pending} className="group mt-1 rounded-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={pending ? "pending" : sent ? "ok" : "idle"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            {pending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" /> Enviando…
              </>
            ) : sent ? (
              <>
                <CircleCheck className="size-4" /> Enviado — enviar outra
              </>
            ) : (
              <>
                Enviar mensagem <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>
        {label}
        {optional && <span className="font-normal text-muted-foreground">(opcional)</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
