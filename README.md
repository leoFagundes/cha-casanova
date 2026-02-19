# 🏡 Chá de Casa Nova — Natália & Leonardo

Site personalizado para o chá de casa nova de **Natália e Leonardo**, com lista de presentes interativa, pagamento integrado via Mercado Pago e painel administrativo para gerenciar os itens da lista.

---

## ✨ Visão geral

O projeto é uma aplicação web completa com três áreas principais:

- **Site público** — página de boas-vindas com informações do evento e acesso à lista de presentes
- **Lista de presentes** — convidados visualizam, filtram e escolhem presentes, com pagamento via Pix ou cartão de crédito diretamente no site
- **Painel admin** — área restrita para cadastrar, editar e excluir presentes da lista

---

## 🖥️ Screenshots das páginas

| Página                       | Rota                        |
| ---------------------------- | --------------------------- |
| Site principal               | `/`                         |
| Lista de presentes (pública) | `/presentes`                |
| Gerenciar presentes (admin)  | `/admin/presentes`          |
| Cadastrar presente (admin)   | `/admin/cadastrar-presente` |

---

## 🛠️ Stack tecnológica

| Tecnologia                                                         | Uso                                      |
| ------------------------------------------------------------------ | ---------------------------------------- |
| [Next.js 14](https://nextjs.org/)                                  | Framework React com App Router           |
| [TypeScript](https://www.typescriptlang.org/)                      | Tipagem estática                         |
| [Tailwind CSS](https://tailwindcss.com/)                           | Estilização utilitária                   |
| [Firebase Firestore](https://firebase.google.com/)                 | Banco de dados em tempo real             |
| [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) | Acesso seguro ao Firestore pelo servidor |
| [Mercado Pago Bricks](https://www.mercadopago.com.br/developers)   | Pagamentos via Pix e cartão de crédito   |
| [Vercel](https://vercel.com/)                                      | Deploy e hospedagem                      |

### Fontes

- **Cormorant Garamond** — tipografia serifada elegante para títulos
- **Jost** — sans-serif moderna para textos e interface

### Paleta de cores customizada

| Nome         | Hex       | Uso                            |
| ------------ | --------- | ------------------------------ |
| `cream`      | `#faf6f0` | Background principal           |
| `warm-white` | `#fffdf9` | Cards e superfícies            |
| `blush`      | `#e8c4b0` | Bordas e detalhes              |
| `rose`       | `#c9866d` | Ações e destaques              |
| `terracotta` | `#8b4a35` | Botões primários               |
| `sage`       | `#8a9e89` | Indicadores de disponibilidade |
| `gold`       | `#c9a96e` | Eyebrows e acentos             |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18 ou superior
- Conta no [Firebase](https://console.firebase.google.com/)
- Conta de desenvolvedor no [Mercado Pago](https://www.mercadopago.com.br/developers)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cha-de-panela.git
cd cha-de-panela
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
# ── Mercado Pago ──────────────────────────────────────────────
# Para desenvolvimento, use as credenciais de TESTE (TEST-...)
# Para produção, use as credenciais de produção (APP_USR-...)
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# URL base do site — SEM barra no final
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# ── Firebase (cliente — vai ao browser) ───────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# ── Firebase Admin (servidor — NUNCA vai ao browser) ──────────
FIREBASE_PROJECT_ID=seu-projeto
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@seu-projeto.iam.gserviceaccount.com
# Cole a chave com aspas duplas incluídas
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXXX\n-----END PRIVATE KEY-----\n"
```

> **Onde encontrar as chaves:**
>
> - **Mercado Pago:** [Meus aplicativos → Credenciais](https://www.mercadopago.com.br/developers/panel/app)
> - **Firebase cliente:** Console → Configurações do projeto → Seus aplicativos → SDK
> - **Firebase admin:** Console → Configurações do projeto → Contas de serviço → Gerar nova chave privada

### 4. Configure o Firestore

No [console do Firebase](https://console.firebase.google.com/), crie um banco Firestore e as seguintes coleções:

**Coleção `gifts`**

```
gifts/{giftId}
  name:      string    — "Jogo de panelas Tramontina"
  desc:      string    — descrição curta
  longDesc:  string    — descrição detalhada
  price:     number    — 389.90
  qty:       number    — quantidade disponível
  taken:     number    — quantidade já escolhida (inicia em 0)
  cat:       string    — "Cozinha"
  emoji:     string    — "🍳"
  prioridade: string   — "alta" | "media" | "baixa"
  link:      string    — link da loja (opcional)
  donors:    array     — lista de doadores (inicia vazia)
```

**Coleção `payments`** _(preenchida automaticamente pelo webhook)_

```
payments/{paymentId}
  giftId:    string
  guestName: string
  message:   string
  status:    string    — "approved"
  method:    string    — "pix" | "credit_card"
  amount:    number
  createdAt: timestamp
```

### 5. Exponha o localhost para o webhook (desenvolvimento)

O Mercado Pago precisa de uma URL pública para enviar confirmações de pagamento. Use o [ngrok](https://ngrok.com/):

```bash
# Em um terminal separado, com o Next.js rodando:
npx ngrok http 3000
```

Copie a URL gerada (ex: `https://abc123.ngrok.io`) e atualize o `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://abc123.ngrok.io
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 💳 Fluxo de pagamento

O pagamento é processado inteiramente dentro do site usando o [Mercado Pago Bricks](https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/landing) — sem redirecionamento para páginas externas.

```
Convidado escolhe o presente
        ↓
Preenche nome, e-mail e mensagem
        ↓
API cria preferência de pagamento no MP
        ↓
Brick do MP renderiza no modal
(Pix com QR Code ou Cartão de crédito)
        ↓
Convidado efetua o pagamento
        ↓
MP chama o webhook automaticamente
        ↓
Webhook valida o pagamento e grava no Firebase
(incrementa taken, adiciona o doador à lista)
        ↓
Modal exibe tela de confirmação ✓
```

### Métodos aceitos

| Método                | Detalhes                                      |
| --------------------- | --------------------------------------------- |
| **Pix**               | QR Code gerado no momento, aprovação imediata |
| **Cartão de crédito** | Até 3× sem juros, tokenização segura via MP   |
| **Cartão de débito**  | Aprovação imediata                            |

---

## 🧪 Testando pagamentos

Use as credenciais de **teste** do Mercado Pago (começam com `TEST-`) e os cartões de teste:

| Cartão     | Número                | CVV    | Vencimento | Resultado   |
| ---------- | --------------------- | ------ | ---------- | ----------- |
| Visa       | `4509 9535 6623 3704` | `123`  | `11/25`    | ✅ Aprovado |
| Mastercard | `5031 7557 3453 0604` | `123`  | `11/25`    | ❌ Recusado |
| Amex       | `3711 803032 57522`   | `1234` | `11/25`    | ✅ Aprovado |

Para **Pix em ambiente de teste**, após gerar o QR Code, acesse o painel do Mercado Pago e aprove o pagamento manualmente em _Atividades → Aprovações pendentes_.

---

## ☁️ Deploy na Vercel

### 1. Importe o projeto na Vercel

```bash
npx vercel
```

Ou importe diretamente pelo [painel da Vercel](https://vercel.com/new).

### 2. Configure as variáveis de ambiente

Acesse **Settings → Environment Variables** no seu projeto na Vercel e cadastre **todas** as variáveis do `.env.local`.

> ⚠️ **Atenção com `FIREBASE_PRIVATE_KEY`:** Cole o valor com as aspas duplas incluídas, exatamente assim:
>
> ```
> "-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
> ```

> ⚠️ **Atenção com `NEXT_PUBLIC_BASE_URL`:** Use a URL **sem barra no final**:
>
> ```
> https://leoenat-casanova.vercel.app
> ```

### 3. Troque para credenciais de produção

No painel do Mercado Pago, vá em **Credenciais de produção** e substitua as chaves `TEST-` pelas `APP_USR-` nas variáveis da Vercel.

### 4. Redeploy

Após cadastrar as variáveis, faça um novo deploy para que elas entrem em vigor:

```bash
npx vercel --prod
```

---

## 🎨 Design system

O projeto usa um design system próprio construído sobre o Tailwind CSS, com foco em elegância e sofisticação para celebrar o momento especial do casal.

### Componentes visuais principais

- **Blobs animados** — gradientes radiais suaves que flutuam no background
- **Textura de ruído** — overlay sutil que adiciona profundidade às superfícies
- **Decorações botânicas** — SVGs de folhas e ramos nos cantos das seções
- **Ilustração da panela** — SVG animado com vapor, coração flutuante e brilhos
- **Cards com hover** — elevação suave e linha de acento gradiente no topo
- **Modais com spring** — animação de entrada com `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Animações customizadas

| Animação            | Duração   | Uso                         |
| ------------------- | --------- | --------------------------- |
| `drift1` / `drift2` | 12s–15s   | Blobs de background         |
| `fadeUp`            | 0.8s      | Elementos ao entrar na tela |
| `steamRise`         | 1.8s–2.6s | Vapor da panela animada     |
| `scrollDot`         | 1.8s      | Indicador de scroll         |
| `modalIn`           | 0.35s     | Entrada dos modais          |

---

## 📋 Funcionalidades

### Site público (`/`)

- [x] Header fixo com scroll behavior e menu hambúrguer mobile
- [x] Hero com nomes do casal, blobs animados e decorações botânicas
- [x] Seção "Sobre" com ilustração da panela animada
- [x] Cards informativos com data, local e detalhes da lista
- [x] Faixa de citação em terracota
- [x] Animações de scroll reveal

### Lista de presentes (`/presentes`)

- [x] Header com navegação e link de volta ao início
- [x] Hero com título e descrição do evento
- [x] Busca em tempo real por nome ou descrição
- [x] Filtro por status (Todos / Disponíveis / Escolhidos)
- [x] Filtro por categoria com pills clicáveis
- [x] Contador de presentes disponíveis vs escolhidos
- [x] Grid responsivo de cards com hover animado
- [x] Overlay "Escolhido ♡" para itens esgotados
- [x] Barra de progresso para itens com múltiplas vagas
- [x] Avatares de doadores nos cards
- [x] Modal de detalhe com descrição completa e link da loja
- [x] Modal de formulário com nome, e-mail e mensagem
- [x] Modal de pagamento com Pix e cartão via Mercado Pago Bricks
- [x] Modal de sucesso com animação de coração e sparkles
- [x] Mural de quem já presenteou com mensagens
- [x] Toast de confirmação após escolha

### Painel admin (`/admin`)

- [x] Header com badge "Painel Admin" e link de volta ao site
- [x] Estatísticas em tempo real (total, disponíveis, escolhidos, alta prioridade)
- [x] Busca e filtros por categoria
- [x] Toggle de visualização grade / lista
- [x] Botão de acesso rápido ao cadastro de novos presentes
- [x] Cards com ações de editar e excluir
- [x] Modal de edição com todos os campos
- [x] Modal de confirmação de exclusão
- [x] Toasts de feedback para todas as ações

### Formulário de cadastro (`/admin/cadastrar-presente`)

- [x] Formulário em 4 seções numeradas no estilo editorial
- [x] Nome, categoria (pills) e descrição
- [x] Preço com máscara monetária, prioridade e quantidade
- [x] Upload de imagem com preview ou URL
- [x] Mensagem ao convidado e nota interna
- [x] Tela de sucesso com opção de cadastrar outro

---

## 🔒 Segurança

- O `MERCADOPAGO_ACCESS_TOKEN` e as credenciais do Firebase Admin **nunca são expostos ao browser** — ficam exclusivamente nas API Routes (servidor)
- A `NEXT_PUBLIC_MP_PUBLIC_KEY` é a única chave do MP que vai ao cliente, conforme documentação oficial
- O webhook valida que o pagamento está `approved` antes de atualizar o Firestore
- As operações no Firestore são feitas em transações para evitar condições de corrida (dois convidados escolhendo o mesmo item simultaneamente)

---

## 🤝 Contribuindo

Este é um projeto privado criado especialmente para o chá de casa nova de **Natália e Leonardo**. Sinta-se à vontade para usar como base para projetos similares.

---

## 📄 Licença

MIT — use, adapte e compartilhe à vontade. ♡

---

<div align="center">
  <p>Feito com muito carinho para</p>
  <h3>Natália & Leonardo 🏡</h3>
  <p><em>"Que o novo lar de vocês seja sempre cheio de amor e alegria."</em></p>
</div>
