export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Quanto tempo leva para ativar meu plano de hospedagem?',
    answer: 'A ativação do plano ocorre rapidamente após a confirmação do pagamento. Você receberá por e-mail todas as credenciais de acesso ao painel cPanel e as instruções para apontamento de DNS e criação de e-mails.',
  },
  {
    question: 'Como funciona o registro de um novo domínio?',
    answer: 'Você pode registrar seu domínio nacional (.com.br, .org.br) ou internacional (.com, .net). Cuidamos de todo o processo de publicação e configuração das zonas de DNS nos nossos servidores para que seu site e e-mails funcionem sem dores de cabeça.',
  },
  {
    question: 'Já tenho um site em outro provedor. A IKONS ajuda na migração?',
    answer: 'Sim! Se você utiliza painel cPanel no provedor anterior, nossa equipe realiza a cópia integral de arquivos, bancos de dados MySQL e contas de e-mail sem tirar seu site do ar e sem custos adicionais.',
  },
  {
    question: 'Como funciona o atendimento de suporte técnico?',
    answer: 'Nosso suporte é 100% centralizado através da nossa plataforma oficial no endereço suporte.ikons.com.br. Você pode abrir chamados para dúvidas de configuração, apontamentos DNS, criação de e-mails e manutenções com histórico completo e rastreabilidade.',
  },
  {
    question: 'Como acesso minhas contas de e-mail corporativo?',
    answer: 'Você pode acessar suas mensagens através do Webmail diretamente pelo navegador em qualquer dispositivo, ou configurar no Microsoft Outlook, Thunderbird, Apple Mail e aplicativos móveis de sua preferência utilizando protocolos seguros IMAP/SMTP com SSL.',
  },
  {
    question: 'Posso alterar o plano de hospedagem no futuro?',
    answer: 'Com certeza. Conforme seu projeto crescer em volume de acessos ou necessidade de armazenamento, o upgrade entre os planos Básico, Intermediário e Avançado é instantâneo e mantém todos os seus dados preservados.',
  },
];
