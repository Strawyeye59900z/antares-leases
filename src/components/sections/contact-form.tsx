"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";

import { sendContact, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      toast.success("Mensagem enviada!", { description: "Retornaremos o contato em breve." });
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const err = state.errors ?? {};

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

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
        <Field id="companyName" label="Empresa" optional>
          <Input id="companyName" name="companyName" placeholder="Nome da empresa" autoComplete="organization" />
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
            key={pending ? "pending" : state.status === "success" ? "ok" : "idle"}
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
            ) : state.status === "success" ? (
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
