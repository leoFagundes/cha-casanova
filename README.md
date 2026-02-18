# 🏡 Chá de Panela — Ana & Lucas

Protótipo da página inicial do site de Chá de Panela, construído com **Next.js 14** (App Router) + **Tailwind CSS** + **TypeScript**.

## 🚀 Como rodar

### 1. Instale as dependências
```bash
npm install
```

### 2. Rode em modo desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### 3. Build para produção
```bash
npm run build
npm start
```

---

## 📁 Estrutura do projeto

```
cha-de-panela/
├── app/
│   ├── globals.css       # Estilos globais + Tailwind base
│   ├── layout.tsx        # Layout raiz + Google Fonts
│   └── page.tsx          # Página principal (monta todas as seções)
├── components/
│   ├── Header.tsx        # Header fixo com menu mobile
│   ├── Hero.tsx          # Seção principal com nomes + CTA
│   ├── About.tsx         # Seção "Sobre o evento" com card visual
│   ├── InfoCards.tsx     # Cards de data, local e presentes
│   ├── QuoteBand.tsx     # Faixa de citação terracota
│   ├── CtaSection.tsx    # Seção final com botão de presentes
│   ├── Footer.tsx        # Rodapé simples
│   ├── BotanicalSvg.tsx  # Decoração botânica SVG
│   ├── ScrollReveal.tsx  # Componente de animação de entrada
│   └── Icons.tsx         # Ícones SVG
├── tailwind.config.ts    # Cores, fontes e animações customizadas
└── next.config.mjs
```

## 🎨 Design

- **Paleta**: terracota, blush, creme, sage e dourado
- **Tipografia**: Cormorant Garamond (serif elegante) + Jost (sans limpo)
- **Animações**: fade-up no hero, scroll reveal nas seções, blobs flutuantes, vapor na panela
- **Responsivo**: mobile-first, menu hambúrguer funcional
"# cha-casanova" 
