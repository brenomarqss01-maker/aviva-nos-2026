import type { FormErrors, RegistrationData } from '../types/registration'
import { isValidBrazilianPhone } from './phone'
import { normalizeText } from './text'

const nameIsValid = (value: string) => normalizeText(value).length >= 2

export function validateStep(step: number, data: RegistrationData): FormErrors {
  const errors: FormErrors = {}

  if (step === 0) {
    if (!nameIsValid(data.firstName)) errors.firstName = 'Informe seu primeiro nome.'
    if (!nameIsValid(data.lastName)) errors.lastName = 'Informe seu sobrenome.'
    if (!isValidBrazilianPhone(data.phone)) errors.phone = 'Informe um celular com DDD e 11 dígitos.'
  }

  if (step === 1) {
    if (!data.isAdult) errors.isAdult = 'Selecione uma das opções.'
    if (data.isAdult === 'no') {
      if (normalizeText(data.guardianName).length < 3) errors.guardianName = 'Informe o nome completo do responsável.'
      if (!isValidBrazilianPhone(data.guardianPhone)) errors.guardianPhone = 'Informe um celular válido com DDD.'
    }
  }

  if (step === 2) {
    if (!data.hasAllergies) errors.hasAllergies = 'Selecione uma das opções.'
    if (data.hasAllergies === 'yes' && normalizeText(data.allergies).length < 3) {
      errors.allergies = 'Conte quais alimentos ou alergias devemos considerar.'
    }
  }

  if (step === 3) {
    if (!data.wantsShirt) errors.wantsShirt = 'Selecione uma das opções.'
    if (data.wantsShirt === 'yes') {
      if (!data.shirtColor) errors.shirtColor = 'Escolha uma referência de cor.'
      if (!data.shirtSize) errors.shirtSize = 'Escolha o tamanho da camiseta.'
    }
  }

  if (step === 4 && !data.confirmed) {
    errors.confirmed = 'Você precisa confirmar a revisão das informações.'
  }

  return errors
}

export function validateAll(data: RegistrationData): FormErrors {
  return [0, 1, 2, 3, 4].reduce<FormErrors>(
    (allErrors, step) => ({ ...allErrors, ...validateStep(step, data) }),
    {},
  )
}

export const fieldStep: Record<keyof RegistrationData, number> = {
  firstName: 0,
  lastName: 0,
  invitedBy: 0,
  phone: 0,
  isAdult: 1,
  guardianName: 1,
  guardianPhone: 1,
  hasAllergies: 2,
  allergies: 2,
  wantsShirt: 3,
  shirtColor: 3,
  shirtSize: 3,
  confirmed: 4,
}
