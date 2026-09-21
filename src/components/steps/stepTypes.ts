import type { FormErrors, RegistrationData, RegistrationField } from '../../types/registration'

export interface StepProps {
  data: RegistrationData
  errors: FormErrors
  setField: <K extends RegistrationField>(field: K, value: RegistrationData[K]) => void
}
