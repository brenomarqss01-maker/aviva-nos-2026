import { ArrowLeftIcon, ArrowRightIcon } from './Icons'

interface StepNavigationProps {
  step: number
  onBack: () => void
  onNext: () => void
}

export function StepNavigation({ step, onBack, onNext }: StepNavigationProps) {
  return (
    <div className="step-navigation">
      {step > 0 ? (
        <button type="button" className="back-button" onClick={onBack}>
          <ArrowLeftIcon /> Voltar
        </button>
      ) : <span />}
      {step < 4 && (
        <button type="button" className="primary-button continue-button" onClick={onNext}>
          Continuar <span className="button-icon"><ArrowRightIcon /></span>
        </button>
      )}
    </div>
  )
}
