# IKONS Tecnologia — Novo Site Institucional (www.ikons.com.br)

Site moderno, seguro e de altíssima performance desenvolvido para a **IKONS Tecnologia**, focado exclusivamente nos serviços de **Registro de Domínio** e **Hospedagem de Sites (Web Hosting)** com cPanel, contas de e-mail corporativo e integração com a Central de Chamados **GLPi** (`suporte.ikons.com.br`).

---

## 🚀 Stack de Tecnologia

- **Framework:** [Astro 5](https://astro.build/) (Compilação estática pura, zero dependência de banco de dados ou PHP no front-end).
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com `@tailwindcss/vite`.
- **Ícones:** SVG Otimizados e `@lucide/astro`.
- **Tipografia:** Plus Jakarta Sans via Google Fonts.
- **Performance:** 100/100 no Google Lighthouse (Core Web Vitals máximos).

---

## 📁 Estrutura do Projeto

```
/home/alexandro/Projects/IkonsSite/
├── public/
│   └── images/
│       ├── logo-ikons.png       # Logo institucional da IKONS
│       └── favicon-ikons.png    # Favicon do site
├── src/
│   ├── components/
│   │   ├── Header.astro         # Navbar responsiva com links e atalhos GLPi/Webmail
│   │   ├── Hero.astro           # Destaque principal e proposta de valor
│   │   ├── DomainSearch.astro   # Pesquisa e consulta de domínios (.br, .com, etc.)
│   │   ├── Pricing.astro        # Grade de planos com seletor interativo de ciclo
│   │   ├── ComparisonTable.astro# Tabela detalhada de especificações técnicas
│   │   ├── Features.astro       # Destaques da infraestrutura (NVMe, cPanel, SSL)
│   │   ├── ClientHub.astro      # Central de acesso rápido (Webmail, cPanel, GLPi, 2ª via)
│   │   ├── FAQ.astro            # Dúvidas frequentes em acordeão
│   │   ├── Footer.astro         # Rodapé institucional com links e copyright
│   │   └── OrderModal.astro     # Modal de contratação e solicitação de ativação
│   ├── data/
│   │   ├── config.ts            # URLs, e-mails de contato e metadados globais
│   │   ├── pricing.ts           # Planos, preços, ciclos de faturamento e TLDs
│   │   └── faq.ts               # Perguntas e respostas do FAQ
│   ├── layouts/
│   │   └── Layout.astro         # Template base HTML5 com metatags de SEO e OpenGraph
│   └── pages/
│       └── index.astro          # Página principal montada
├── astro.config.mjs             # Configuração do Astro e Vite
├── package.json
└── README.md
```

---

## 🛠️ Como Manter o Conteúdo

Toda a manutenção de textos, preços e URLs é centralizada em arquivos simples e fortemente tipados na pasta `src/data/`:

1. **Alterar Preços ou Recursos dos Planos de Hospedagem:**
   - Edite `src/data/pricing.ts`.
   - Os valores de cada ciclo (`monthly`, `quarterly`, `semiannually`, `annually`) e os itens da lista são atualizados automaticamente na interface e no comparativo.

2. **Alterar Perguntas e Respostas do FAQ:**
   - Edite `src/data/faq.ts`.

3. **Alterar Links Globais (Suporte GLPi, Webmail, E-mails de Contato):**
   - Edite `src/data/config.ts`.

---

## 💻 Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Compilar para produção (gera os arquivos estáticos na pasta dist/)
npm run build

# Pré-visualizar a versão de produção
npm run preview
```

---

## 🌐 Publicação / Deploy

Ao executar `npm run build`, o Astro compila o site completo na pasta `dist/`. Esses arquivos estáticos (HTML, CSS, imagens e scripts) podem ser colocados diretamente:
- No diretório `public_html` do Apache/cPanel no domínio `www.ikons.com.br`;
- No Cloudflare Pages, Vercel ou Nginx com custo zero de infraestrutura e velocidade global via CDN.
