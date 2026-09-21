import { eventConfig } from '../config/eventConfig'
import { shirts } from '../config/shirtConfig'
import type { RegistrationData } from '../types/registration'
import { normalizeText, yesNoLabel } from './text'

export function sanitizeRegistration(data: RegistrationData): RegistrationData {
  return {
    ...data,
    firstName: normalizeText(data.firstName),
    lastName: normalizeText(data.lastName),
    invitedBy: normalizeText(data.invitedBy),
    guardianName: normalizeText(data.guardianName),
    allergies: normalizeText(data.allergies),
  }
}

export function buildWhatsAppMessage(rawData: RegistrationData): string {
  const data = sanitizeRegistration(rawData)
  const lines = [
    `Olá! Gostaria de confirmar minha inscrição para o ${eventConfig.name}.`,
    '',
    '*DADOS DA INSCRIÇÃO*',
    '',
    '*Nome completo:*',
    `${data.firstName} ${data.lastName}`,
    '',
    '*Celular:*',
    data.phone,
    '',
    '*Quem me convidou:*',
    data.invitedBy || 'Não informado',
    '',
    '*Maior de 18 anos:*',
    yesNoLabel(data.isAdult),
  ]

  if (data.isAdult === 'no') {
    lines.push('', '*Responsável:*', data.guardianName, '', '*Contato do responsável:*', data.guardianPhone)
  }

  lines.push('', '*ALIMENTAÇÃO*', '', '*Possui alergia alimentar:*', yesNoLabel(data.hasAllergies))

  if (data.hasAllergies === 'yes') {
    lines.push('', '*Alimento(s)/alergia(s) informado(s):*', data.allergies)
  }

  lines.push('', '*CAMISETA AVIVA-NOS*', '', '*Deseja adquirir camiseta:*', yesNoLabel(data.wantsShirt))

  if (data.wantsShirt === 'yes') {
    const shirtLabel = shirts.find((shirt) => shirt.id === data.shirtColor)?.label ?? data.shirtColor
    lines.push(
      '',
      '*Modelo/Cor:*',
      shirtLabel,
      '',
      '*Tamanho:*',
      data.shirtSize,
      '',
      '*Valor:*',
      eventConfig.shirtPriceLabel,
    )
  }

  lines.push('', '*Confirmação:*', 'Confirmo que revisei as informações da minha inscrição.')
  return lines.join('\n')
}

export function buildWhatsAppUrl(data: RegistrationData): string {
  return `https://wa.me/${eventConfig.whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`
}
