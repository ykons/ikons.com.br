export type BillingCycle = 'monthly' | 'quarterly' | 'semiannually' | 'annually';

export interface PlanCyclePrice {
  total: number;
  perMonth: number;
  savingsPercent?: number;
  label: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  prices: Record<BillingCycle, PlanCyclePrice>;
  storage: string;
  emails: string;
  databases: string;
  features: string[];
}

export const billingCycles: { id: BillingCycle; label: string; badge?: string }[] = [
  { id: 'monthly', label: 'Mensal' },
  { id: 'quarterly', label: 'Trimestral', badge: 'Econômico' },
  { id: 'semiannually', label: 'Semestral', badge: 'Desconto' },
  { id: 'annually', label: 'Anual', badge: 'Melhor Valor' },
];

export const hostingPlans: PricingPlan[] = [
  {
    id: 'basico',
    name: 'Básico',
    tagline: 'Ideal para sites institucionais, blogs e novos projetos na web.',
    popular: false,
    prices: {
      monthly: {
        total: 29.00,
        perMonth: 29.00,
        label: 'R$ 29,00 / mês',
      },
      quarterly: {
        total: 83.00,
        perMonth: 27.67,
        savingsPercent: 5,
        label: 'R$ 83,00 / trimestre',
      },
      semiannually: {
        total: 150.00,
        perMonth: 25.00,
        savingsPercent: 14,
        label: 'R$ 150,00 / semestre',
      },
      annually: {
        total: 285.00,
        perMonth: 23.75,
        savingsPercent: 18,
        label: 'R$ 285,00 / ano',
      },
    },
    storage: '4 GB SSD',
    emails: '10 Contas de E-mail',
    databases: '6 Bancos de Dados MySQL',
    features: [
      '4 GB de armazenamento em SSD',
      '10 Contas de e-mail corporativo',
      '6 Bancos de dados MySQL',
      'Painel de controle cPanel em português',
      'Instalador Softaculous (WordPress em 1 clique)',
      'Certificado SSL Grátis (HTTPS)',
      'Tráfego mensal ilimitado',
      'Webmail corporativo responsivo',
      'Suporte técnico especializado',
    ],
  },
  {
    id: 'intermediario',
    name: 'Intermediário',
    tagline: 'Para empresas em expansão que exigem mais espaço e caixas de e-mail.',
    popular: true,
    prices: {
      monthly: {
        total: 50.00,
        perMonth: 50.00,
        label: 'R$ 50,00 / mês',
      },
      quarterly: {
        total: 128.00,
        perMonth: 42.67,
        savingsPercent: 15,
        label: 'R$ 128,00 / trimestre',
      },
      semiannually: {
        total: 225.00,
        perMonth: 37.50,
        savingsPercent: 25,
        label: 'R$ 225,00 / semestre',
      },
      annually: {
        total: 420.00,
        perMonth: 35.00,
        savingsPercent: 30,
        label: 'R$ 420,00 / ano',
      },
    },
    storage: '10 GB SSD',
    emails: '20 Contas de E-mail',
    databases: '10 Bancos de Dados MySQL',
    features: [
      '10 GB de armazenamento em SSD',
      '20 Contas de e-mail corporativo',
      '10 Bancos de dados MySQL',
      'Painel de controle cPanel em português',
      'Instalador Softaculous (WordPress, Joomla, etc.)',
      'Certificado SSL Grátis (HTTPS)',
      'Backups automáticos regulares',
      'Tráfego mensal ilimitado',
      'Webmail corporativo responsivo',
      'Suporte técnico prioritário',
    ],
  },
  {
    id: 'avancado',
    name: 'Avançado',
    tagline: 'Máxima performance e capacidade para e-commerces e portais de grande tráfego.',
    popular: false,
    prices: {
      monthly: {
        total: 160.00,
        perMonth: 160.00,
        label: 'R$ 160,00 / mês',
      },
      quarterly: {
        total: 420.00,
        perMonth: 140.00,
        savingsPercent: 12,
        label: 'R$ 420,00 / trimestre',
      },
      semiannually: {
        total: 795.00,
        perMonth: 132.50,
        savingsPercent: 17,
        label: 'R$ 795,00 / semestre',
      },
      annually: {
        total: 1500.00,
        perMonth: 125.00,
        savingsPercent: 22,
        label: 'R$ 1.500,00 / ano',
      },
    },
    storage: '40 GB SSD',
    emails: '50 Contas de E-mail',
    databases: '12 Bancos de Dados MySQL',
    features: [
      '40 GB de armazenamento em SSD',
      '50 Contas de e-mail corporativo',
      '12 Bancos de dados MySQL',
      'Recursos de processamento de alto rendimento',
      'Painel de controle cPanel em português',
      'Instalador Softaculous completo',
      'Certificado SSL Grátis (HTTPS)',
      'Rotina avançada de backups',
      'Tráfego mensal ilimitado',
      'Webmail corporativo responsivo',
      'Suporte técnico exclusivo',
    ],
  },
];

export const domainExtensions = [
  { tld: '.com.br', price: 'R$ 40,00/ano', popular: true, note: 'A extensão preferida no Brasil' },
  { tld: '.com', price: 'R$ 69,00/ano', popular: true, note: 'Presença e alcance global' },
  { tld: '.net', price: 'R$ 79,00/ano', popular: false, note: 'Ideal para redes e tecnologia' },
  { tld: '.org.br', price: 'R$ 40,00/ano', popular: false, note: 'Para ONGs e instituições' },
];
