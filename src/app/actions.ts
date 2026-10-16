"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const data = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    company: String(formData.get("companyName") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Campo invisível para bots (honeypot)
  if (formData.get("company")) return { status: "success" };

  const errors: ContactState["errors"] = {};
  if (data.name.length < 2) errors.name = "Informe seu nome.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Informe um e-mail válido.";
  if (data.phone && data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone incompleto.";
  if (data.message.length < 10) errors.message = "Conte um pouco mais (mín. 10 caracteres).";
  if (data.message.length > 2000) errors.message = "Mensagem muito longa.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // Envio de e-mail ainda não configurado: em desenvolvimento apenas registra no console.
    console.warn("[contato] RESEND_API_KEY/CONTACT_TO_EMAIL ausentes. Mensagem:", data);
    if (process.env.NODE_ENV === "production") {
      return { status: "error", message: "Formulário indisponível no momento. Ligue para nós." };
    }
    return { status: "success" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Site Antares Leases <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: `Novo contato pelo site — ${data.name}`,
      text: `Nome: ${data.name}\nE-mail: ${data.email}\nTelefone: ${data.phone || "-"}\nEmpresa: ${data.company || "-"}\n\n${data.message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contato] Falha no envio:", res.status, await res.text());
    return { status: "error", message: "Não foi possível enviar agora. Tente novamente ou ligue para nós." };
  }

  return { status: "success" };
}
