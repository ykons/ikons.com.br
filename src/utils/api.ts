/**
 * Cliente HTTP tipado para as APIs públicas do GestorVPS
 */
import { siteConfig } from '../data/config';
import { cleanDigits } from './cpfCnpj';

export interface DomainCheckResponse {
  domain: string;
  available: boolean;
  price?: number;
  currency?: string;
  tld?: string;
  message?: string;
}

export interface CreateOrderPayload {
  name: string;
  document: string;
  email: string;
  phone: string;
  productId: number;
  billingCycle: 'monthly' | 'quarterly' | 'semiannually' | 'annually';
  domain?: string;
}

export interface PaymentDetails {
  pix_copia_e_cola?: string | null;
  pix_qr_code_image?: string | null;
  boleto_barcode?: string | null;
  boleto_url?: string | null;
}

export interface InvoiceDetails {
  id: number;
  status: string;
  total: number;
  due_date?: string;
  gateway?: string;
  payment?: PaymentDetails;
}

export interface OrderResponseData {
  order_id: number;
  client: {
    name: string;
    document: string;
    email: string;
    phone?: string;
  };
  service: {
    id: number;
    product_id: number;
    product_name: string;
    domain?: string;
    billing_cycle: string;
    amount: number;
    status: string;
  };
  invoice: InvoiceDetails;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

const API_TIMEOUT_MS = 10000;

/**
 * Consulta a disponibilidade de um domínio no GestorVPS
 */
export async function checkDomainAvailability(domain: string): Promise<DomainCheckResponse> {
  const url = `${siteConfig.gestorVps.apiUrl}/v1/domains/check?domain=${encodeURIComponent(domain.trim())}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || 'Não foi possível verificar a disponibilidade do domínio.');
    }

    return await response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('A verificação de domínio demorou muito para responder. Tente novamente.');
    }
    throw error;
  }
}

/**
 * Cria um pedido express público gerando fatura imediata com PIX / Boleto
 */
export async function createPublicOrder(payload: CreateOrderPayload): Promise<OrderResponseData> {
  const url = `${siteConfig.gestorVps.apiUrl}/v1/orders`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  const requestBody = {
    name: payload.name.trim(),
    document: cleanDigits(payload.document),
    email: payload.email.trim(),
    phone: cleanDigits(payload.phone),
    product_id: payload.productId,
    billing_cycle: payload.billingCycle,
    domain: payload.domain ? payload.domain.trim() : null,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 422 && json.errors) {
        // Coleta o primeiro erro de cada campo
        const messages = Object.values(json.errors)
          .flat()
          .filter(Boolean) as string[];
        const combined = messages.length > 0 ? messages.join(' ') : (json.message || 'Dados inválidos.');
        const err: any = new Error(combined);
        err.validationErrors = json.errors;
        throw err;
      }
      throw new Error(json.message || 'Falha ao processar o pedido. Tente novamente.');
    }

    return json.data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('A requisição expirou. Verifique sua conexão e tente novamente.');
    }
    throw error;
  }
}

/**
 * Solicita link mágico de 2ª via rápida de fatura sem senha por CPF/CNPJ
 */
export async function requestInvoiceAccess(document: string): Promise<{ message: string }> {
  const url = `${siteConfig.gestorVps.apiUrl}/v1/invoices/request-access`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        document: cleanDigits(document),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 422 && json.errors?.document) {
        throw new Error(json.errors.document[0]);
      }
      throw new Error(json.message || 'Não foi possível solicitar a 2ª via. Tente novamente mais tarde.');
    }

    return {
      message: json.message || 'Link seguro enviado com sucesso para o e-mail cadastrado.',
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Tempo de requisição esgotado. Tente novamente.');
    }
    throw error;
  }
}
