export type YesNo = 'yes' | 'no' | ''
export type ShirtColor = 'white' | 'black' | ''
export type ShirtSize = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | ''

export interface RegistrationData {
  firstName: string
  lastName: string
  invitedBy: string
  phone: string
  isAdult: YesNo
  guardianName: string
  guardianPhone: string
  hasAllergies: YesNo
  allergies: string
  wantsShirt: YesNo
  shirtColor: ShirtColor
  shirtSize: ShirtSize
  confirmed: boolean
}

export type RegistrationField = keyof RegistrationData
export type FormErrors = Partial<Record<RegistrationField, string>>

export const initialRegistrationData: RegistrationData = {
  firstName: '',
  lastName: '',
  invitedBy: '',
  phone: '',
  isAdult: '',
  guardianName: '',
  guardianPhone: '',
  hasAllergies: '',
  allergies: '',
  wantsShirt: '',
  shirtColor: '',
  shirtSize: '',
  confirmed: false,
}
