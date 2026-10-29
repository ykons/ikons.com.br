import test from 'node:test';
import assert from 'node:assert';
import { 
  validateCpf, 
  validateCnpj, 
  validateDocument, 
  formatDocument, 
  formatPhone, 
  cleanDigits 
} from '../src/utils/cpfCnpj.ts';

test('cleanDigits remove pontuação e caracteres não numéricos', () => {
  assert.strictEqual(cleanDigits('529.982.247-25'), '52998224725');
  assert.strictEqual(cleanDigits('(71) 99999-8888'), '71999998888');
});

test('validateCpf valida CPFs corretos e rejeita inválidos', () => {
  // CPF válido padrão de teste
  assert.strictEqual(validateCpf('529.982.247-25'), true);
  assert.strictEqual(validateCpf('52998224725'), true);

  // CPFs com dígitos repetidos devem ser rejeitados
  assert.strictEqual(validateCpf('111.111.111-11'), false);
  assert.strictEqual(validateCpf('000.000.000-00'), false);

  // CPF com dígito verificador adulterado
  assert.strictEqual(validateCpf('529.982.247-26'), false);
  assert.strictEqual(validateCpf('123.456.789-00'), false);

  // Tamanho incorreto
  assert.strictEqual(validateCpf('12345'), false);
});

test('validateCnpj valida CNPJs corretos e rejeita inválidos', () => {
  // CNPJ válido padrão (ex: Receita / GestorVPS)
  assert.strictEqual(validateCnpj('00.000.000/0001-91'), true);
  assert.strictEqual(validateCnpj('00000000000191'), true);

  // CNPJ da IKONS (45.038.328/0001-35)
  assert.strictEqual(validateCnpj('45.038.328/0001-35'), true);

  // CNPJ com dígitos repetidos
  assert.strictEqual(validateCnpj('11.111.111/1111-11'), false);

  // CNPJ com dígito verificador adulterado
  assert.strictEqual(validateCnpj('45.038.328/0001-36'), false);
});

test('validateDocument valida tanto CPF quanto CNPJ', () => {
  assert.strictEqual(validateDocument('529.982.247-25'), true);
  assert.strictEqual(validateDocument('45.038.328/0001-35'), true);
  assert.strictEqual(validateDocument('111.111.111-11'), false);
  assert.strictEqual(validateDocument(''), false);
});

test('formatDocument formata CPF e CNPJ progressivamente', () => {
  assert.strictEqual(formatDocument('52998224725'), '529.982.247-25');
  assert.strictEqual(formatDocument('45038328000135'), '45.038.328/0001-35');
});

test('formatPhone formata telefones fixos e celulares', () => {
  assert.strictEqual(formatPhone('71999998888'), '(71) 99999-8888');
  assert.strictEqual(formatPhone('7133334444'), '(71) 3333-4444');
});
