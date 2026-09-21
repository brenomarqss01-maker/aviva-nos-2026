import { useState, type RefObject } from 'react'
import type { FormErrors, RegistrationData, RegistrationField } from '../types/registration'
import { initialRegistrationData } from '../types/registration'
import { fieldStep, validateAll, validateStep } from '../utils/validation'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { ProgressIndicator } from './ProgressIndicator'
import { StepNavigation } from './StepNavigation'
import { WhatsAppRedirect } from './WhatsAppRedirect'
import { AgeStep } from './steps/AgeStep'
import { HealthStep } from './steps/HealthStep'
import { PersonalDataStep } from './steps/PersonalDataStep'
import { ReviewStep } from './steps/ReviewStep'
import { ShirtStep } from './steps/ShirtStep'

interface RegistrationFlowProps {
  sectionRef: RefObject<HTMLElement | null>
}

function focusField(field: RegistrationField) {
  requestAnimationFrame(() => {
    const target = document.querySelector<HTMLElement>(`#${field}, [name="${field}"]`)
    target?.focus()
  })
}

export function RegistrationFlow({ sectionRef }: RegistrationFlowProps) {
  const [data, setData] = useState<RegistrationData>(initialRegistrationData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [whatsAppUrl, setWhatsAppUrl] = useState('')

  const setField = <K extends RegistrationField>(field: K, value: RegistrationData[K]) => {
    setData((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const showStep = (nextStep: number) => {
    setDirection(nextStep >= step ? 'forward' : 'back')
    setStep(nextStep)
    setErrors({})
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const handleNext = () => {
    const nextErrors = validateStep(step, data)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      focusField(Object.keys(nextErrors)[0] as RegistrationField)
      return
    }
    showStep(Math.min(step + 1, 4))
  }

  const handleBack = () => showStep(Math.max(step - 1, 0))

  const handleSubmit = () => {
    const allErrors = validateAll(data)
    const firstInvalidField = Object.keys(allErrors)[0] as RegistrationField | undefined

    if (firstInvalidField) {
      const invalidStep = fieldStep[firstInvalidField]
      setErrors(allErrors)
      if (invalidStep !== step) {
        setDirection(invalidStep < step ? 'back' : 'forward')
        setStep(invalidStep)
      }
      focusField(firstInvalidField)
      return
    }

    const url = buildWhatsAppUrl(data)
    setWhatsAppUrl(url)
    const popup = window.open(url, '_blank', 'noopener,noreferrer')
    if (popup) popup.opener = null
  }

  const commonStepProps = { data, errors, setField }

  return (
    <section ref={sectionRef} id="inscricao" className="registration-section" aria-label="Formulário de inscrição">
      <div className="registration-background-word" aria-hidden="true">AVIVA</div>
      <div className="registration-shell page-shell">
        <ProgressIndicator currentStep={step} />

        <div className="form-card">
          <div className={`step-transition direction-${direction}`} key={step}>
            {step === 0 && <PersonalDataStep {...commonStepProps} />}
            {step === 1 && <AgeStep {...commonStepProps} />}
            {step === 2 && <HealthStep {...commonStepProps} />}
            {step === 3 && <ShirtStep {...commonStepProps} />}
            {step === 4 && (
              <ReviewStep
                {...commonStepProps}
                onEdit={showStep}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          <StepNavigation step={step} onBack={handleBack} onNext={handleNext} />
        </div>

        <footer className="site-footer">
          <div className="organizer-mark dark">
            <span className="organizer-dot" aria-hidden="true" />
            <span>JUBRAC</span>
          </div>
          <p>Acampamento Aviva-Nos 2026</p>
          <span>Inscrição confirmada pelo WhatsApp</span>
        </footer>
      </div>

      {whatsAppUrl && <WhatsAppRedirect url={whatsAppUrl} onClose={() => setWhatsAppUrl('')} />}
    </section>
  )
}
