/**
 * Cloudflare Pages Function: POST /api/contact
 * Valida a mensagem do formulário e envia por e-mail via Resend.
 *
 * Variáveis (Cloudflare: Settings → Variables and Secrets; local: .dev.vars):
 *   RESEND_API_KEY     chave da API do Resend (marque como Secret)
 *   CONTACT_TO_EMAIL   quem recebe as mensagens
 *   CONTACT_FROM_EMAIL remetente, ex.: "Site Antares Leases <site@seudominio.com.br>"
 */
import { readContact, validateContact, type ContactResponse } from "../../src/lib/contact";

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const json = (body: ContactResponse, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, message: "Requisição inválida." }, 400);
  }

  const data = readContact(input);
  if (data.website) return json({ ok: true });

  const errors = validateContact(data);
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error("[contato] RESEND_API_KEY ou CONTACT_TO_EMAIL não configurados.");
    return json({ ok: false, message: "Formulário indisponível no momento. Ligue para nós." }, 503);
  }

  const failed = () =>
    json({ ok: false, message: "Não foi possível enviar agora. Tente novamente ou ligue para nós." }, 502);

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || "Site Antares Leases <onboarding@resend.dev>",
        to: env.CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: `Novo contato pelo site — ${data.name}${data.company ? ` (${data.company})` : ""}`,
        text: [
          `Nome: ${data.name}`,
          `E-mail: ${data.email}`,
          `Telefone: ${data.phone || "-"}`,
          `Empresa: ${data.company || "-"}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });
  } catch (error) {
    console.error("[contato] Erro de rede ao chamar o Resend:", error);
    return failed();
  }

  if (!res.ok) {
    console.error("[contato] Falha no Resend:", res.status, await res.text());
    return failed();
  }

  return json({ ok: true });
};
