import { describe, expect, it } from 'vitest'
import { shirts } from '../config/shirtConfig'
import { initialRegistrationData, type RegistrationData } from '../types/registration'
import { formatPhone } from './phone'
import { validateAll, validateStep } from './validation'
import { buildWhatsAppMessage, buildWhatsAppUrl } from './whatsapp'

const validData: RegistrationData = {
  ...initialRegistrationData,
  firstName: 'João',
  lastName: 'da Silva',
  phone: '(14) 99999-1234',
  isAdult: 'yes',
  hasAllergies: 'no',
  wantsShirt: 'no',
  confirmed: true,
}

describe('máscara de telefone', () => {
  it('formata um celular brasileiro e limita a 11 dígitos', () => {
    expect(formatPhone('1499999123499')).toBe('(14) 99999-1234')
  })
})

describe('validação condicional', () => {
  it('exige responsável somente para participante menor', () => {
    expect(validateStep(1, { ...validData, isAdult: 'no' })).toMatchObject({
      guardianName: expect.any(String),
      guardianPhone: expect.any(String),
    })
    expect(validateStep(1, validData)).toEqual({})
  })

  it('exige detalhes da alergia somente quando a resposta é sim', () => {
    expect(validateStep(2, { ...validData, hasAllergies: 'yes' })).toHaveProperty('allergies')
    expect(validateStep(2, validData)).toEqual({})
  })

  it('exige cor e tamanho somente quando compra camiseta', () => {
    expect(validateStep(3, { ...validData, wantsShirt: 'yes' })).toMatchObject({
      shirtColor: expect.any(String),
      shirtSize: expect.any(String),
    })
    expect(validateAll(validData)).toEqual({})
  })
})

describe('mensagem do WhatsApp', () => {
  it('omite blocos condicionais que não se aplicam', () => {
    const message = buildWhatsAppMessage(validData)
    expect(message).not.toContain('*Responsável:*')
    expect(message).not.toContain('*Alimento(s)/alergia(s) informado(s):*')
    expect(message).not.toContain('*Modelo/Cor:*')
    expect(message).toContain('Não informado')
  })

  it('inclui todos os dados da camiseta quando selecionada', () => {
    const message = buildWhatsAppMessage({
      ...validData,
      wantsShirt: 'yes',
      shirtColor: shirts[1].id,
      shirtSize: 'GG',
    })
    expect(message).toContain('*Modelo/Cor:*\nPreta')
    expect(message).toContain('*Tamanho:*\nGG')
    expect(message).toContain('*Valor:*\nR$ 50,00')
  })

  it('gera a URL oficial, com número e mensagem codificada', () => {
    const url = buildWhatsAppUrl(validData)
    expect(url).toMatch(/^https:\/\/wa\.me\/5514998331409\?text=/)
    expect(url).toContain('%C3%A3')
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(buildWhatsAppMessage(validData))
  })
})
