# Antares Leases — Landing page

Site da Antares Leases (aluguel de carros), feito com Next.js, Tailwind CSS, componentes shadcn/ui e animações com `motion`.

## Como rodar no seu computador

1. Instale o [Node.js](https://nodejs.org) versão 20 ou mais nova (a versão "LTS" do site serve).
2. Baixe o projeto:
   ```bash
   git clone https://github.com/Strawyeye59900z/antares-leases.git
   cd antares-leases
   ```
3. Instale as dependências (só na primeira vez):
   ```bash
   npm install
   ```
4. Rode o site:
   ```bash
   npm run dev
   ```
5. Abra **http://localhost:3000** no navegador. Ao salvar qualquer arquivo, a página atualiza sozinha.

Para parar o servidor, aperte `Ctrl + C` no terminal.

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos, telefone, WhatsApp, e-mail, endereço, horário, fotos | `src/config/site.ts` |
| Logo | `src/components/logo.tsx` (ou coloque a imagem em `public/` e use-a ali) |
| Cores do tema | `src/app/globals.css` |
| Seções da página | `src/components/sections/` |

Itens marcados com `TODO` em `src/config/site.ts` ainda precisam das informações reais.

## Formulário de contato (envio por e-mail)

O formulário envia as mensagens por e-mail usando o [Resend](https://resend.com) (tem plano gratuito).

1. Crie uma conta no Resend e gere uma API key.
2. Copie `.env.example` para `.env.local` e preencha:
   ```
   RESEND_API_KEY=sua_chave
   CONTACT_TO_EMAIL=email.que.recebe@exemplo.com
   ```
3. Reinicie o `npm run dev`.

Sem essas variáveis, no modo de desenvolvimento a mensagem só aparece no terminal; no site publicado, o formulário avisa que está indisponível e pede para ligar.

## Publicar

O jeito mais simples é a [Vercel](https://vercel.com): importe este repositório, adicione as variáveis do Resend em *Settings → Environment Variables* e faça o deploy.
