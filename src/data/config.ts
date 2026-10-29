export const siteConfig = {
  name: 'IKONS Tecnologia',
  tagline: 'Hospedagem de Sites de Alta Performance & Registro de Domínio',
  description: 'Soluções confiáveis em hospedagem de sites com cPanel, contas de e-mail corporativo, armazenamento SSD de alta velocidade, SSL grátis e registro de domínios.',
  url: 'https://www.ikons.com.br',
  domain: 'ikons.com.br',
  links: {
    support: 'https://suporte.ikons.com.br',
    webmail: 'https://webmail.ikons.com.br',
    cpanel: 'https://cpanel.ikons.com.br',
    contactEmail: 'contato@ikons.com.br',
  },
  gestorVps: {
    apiUrl: (import.meta.env.PUBLIC_GESTORVPS_API_URL as string) || 'https://gestao.ikons.com.br/api',
    baseUrl: (import.meta.env.PUBLIC_GESTORVPS_URL as string) || 'https://gestao.ikons.com.br',
  },
  products: {
    basicoId: Number(import.meta.env.PUBLIC_PRODUCT_BASICO_ID || 1),
    intermediarioId: Number(import.meta.env.PUBLIC_PRODUCT_INTERMEDIARIO_ID || 2),
    avancadoId: Number(import.meta.env.PUBLIC_PRODUCT_AVANCADO_ID || 3),
  },
  company: {
    name: 'IKONS Tecnologia',
    foundedYear: 2010,
    copyright: `© ${new Date().getFullYear()} IKONS Tecnologia. Todos os direitos reservados.`,
  }
};

/**
 * Retorna o ID do produto no GestorVPS a partir do identificador do plano
 */
export function getProductIdByPlan(planId: string): number {
  switch (planId) {
    case 'basico':
      return siteConfig.products.basicoId;
    case 'intermediario':
      return siteConfig.products.intermediarioId;
    case 'avancado':
      return siteConfig.products.avancadoId;
    default:
      return siteConfig.products.intermediarioId;
  }
}
