/**
 * Validação do formulário de contato, usada no navegador e na função
 * da Cloudflare (functions/api/contact.ts). Sem dependências do Next.
 */
export type ContactField = "name" | "email" | "phone" | "message";

export type ContactData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  /** Campo invisível para bots (honeypot): pessoas nunca preenchem. */
  website: string;
};

export type ContactResponse =
  | { ok: true }
  | { ok: false; message?: string; errors?: Partial<Record<ContactField, string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readContact(input: Record<string, unknown>): ContactData {
  const field = (key: string) => String(input[key] ?? "").trim();
  return {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    company: field("company"),
    message: field("message"),
    website: field("website"),
  };
}

export function validateContact(data: ContactData) {
  const errors: Partial<Record<ContactField, string>> = {};
  if (data.name.length < 2) errors.name = "Informe seu nome.";
  else if (data.name.length > 120) errors.name = "Nome muito longo.";
  if (!EMAIL_RE.test(data.email) || data.email.length > 200) errors.email = "Informe um e-mail válido.";
  if (data.phone && data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone incompleto.";
  if (data.message.length < 10) errors.message = "Conte um pouco mais (mín. 10 caracteres).";
  else if (data.message.length > 2000) errors.message = "Mensagem muito longa.";
  return errors;
}
