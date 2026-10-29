/**
 * Utilitários para validação e formatação de CPF e CNPJ brasileiros
 */

/**
 * Remove caracteres não numéricos
 */
export function cleanDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validação formal de CPF com cálculo dos dois dígitos verificadores
 */
export function validateCpf(cpf: string): boolean {
  const digits = cleanDigits(cpf);

  if (digits.length !== 11) {
    return false;
  }

  // Rejeita sequências de dígitos repetidos conhecidas (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(digits)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i), 10) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(9), 10)) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i), 10) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(10), 10)) {
    return false;
  }

  return true;
}

/**
 * Validação formal de CNPJ com cálculo dos dois dígitos verificadores
 */
export function validateCnpj(cnpj: string): boolean {
  const digits = cleanDigits(cnpj);

  if (digits.length !== 14) {
    return false;
  }

  // Rejeita sequências com todos os dígitos iguais
  if (/^(\d)\1{13}$/.test(digits)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(digits.charAt(12), 10)) {
    return false;
  }

  // Validação do segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(digits.charAt(13), 10)) {
    return false;
  }

  return true;
}

/**
 * Valida se a string informada é um CPF ou CNPJ válido
 */
export function validateDocument(value: string): boolean {
  const digits = cleanDigits(value);
  if (digits.length === 11) {
    return validateCpf(digits);
  }
  if (digits.length === 14) {
    return validateCnpj(digits);
  }
  return false;
}

/**
 * Aplica máscara dinâmica de CPF ou CNPJ conforme a digitação do usuário
 */
export function formatDocument(value: string): string {
  const digits = cleanDigits(value).slice(0, 14);

  if (digits.length <= 11) {
    // Máscara de CPF: 000.000.000-00
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  // Máscara de CNPJ: 00.000.000/0000-00
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

/**
 * Aplica máscara de telefone celular ou fixo (00) 0000-0000 ou (00) 00000-0000
 */
export function formatPhone(value: string): string {
  const digits = cleanDigits(value).slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }

  return digits
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}
