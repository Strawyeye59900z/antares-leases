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

O formulário envia as mensagens por e-mail usando o [Resend](https://resend.com) (plano gratuito: 3.000 e-mails/mês).
Quem faz o envio é uma função da Cloudflare em `functions/api/contact.ts`; a chave do Resend fica só no servidor, nunca no site.

**1. Configure o Resend**
1. Crie uma conta em https://resend.com.
2. Em **Domains → Add Domain**, adicione o domínio da empresa e crie no DNS os registros que o Resend mostrar. Quando o domínio ficar *Verified*, você pode enviar como `site@seudominio.com.br`.
   - Sem domínio verificado, o Resend só envia para o e-mail da própria conta do Resend (bom para testar).
3. Em **API Keys → Create API Key**, crie uma chave com permissão *Sending access* e copie (ela começa com `re_`).

**2. Variáveis**

| Variável | O que é |
|---|---|
| `RESEND_API_KEY` | A chave do Resend (marque como **Secret** na Cloudflare) |
| `CONTACT_TO_EMAIL` | Quem recebe as mensagens (pode ser mais de um, separados por vírgula) |
| `CONTACT_FROM_EMAIL` | Remetente, ex.: `Site Antares Leases <site@seudominio.com.br>` |

**3. Testar no seu computador**

`npm run dev` mostra o site, mas não roda a função do formulário. Para testar o envio:
1. Copie `.dev.vars.example` para `.dev.vars` e preencha as variáveis.
2. Rode `npm run preview` e abra **http://localhost:8788**.

## Publicar no Cloudflare Pages

O site é exportado como páginas estáticas (pasta `out`) e o formulário roda como Pages Function.

**Pelo painel, com deploy automático a cada `git push` (recomendado)**
1. Em https://dash.cloudflare.com, abra **Workers & Pages → Create → Pages → Connect to Git** e escolha este repositório.
2. Configurações de build:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
3. Em **Environment variables**, adicione as variáveis da tabela acima (a chave como *Encrypt*/Secret) e clique em **Save and Deploy**.
4. Depois de publicado, em **Custom domains → Set up a custom domain**, adicione seu domínio e siga as instruções de DNS.

**Pela linha de comando**
```bash
npx wrangler login
npm run deploy
```
