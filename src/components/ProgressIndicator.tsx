import { CheckIcon } from './Icons'

const steps = ['Seus dados', 'Responsável', 'Alimentação', 'Camiseta', 'Revisão']

interface ProgressIndicatorProps {
  currentStep: number
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <nav className="progress" aria-label="Progresso da inscrição">
      <div className="mobile-progress">
        <div>
          <span>Etapa {currentStep + 1} de {steps.length}</span>
          <strong>{steps[currentStep]}</strong>
        </div>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-track-mobile" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <ol className="progress-list">
        {steps.map((step, index) => {
          const completed = index < currentStep
          const active = index === currentStep
          return (
            <li key={step} className={`${completed ? 'is-complete' : ''} ${active ? 'is-active' : ''}`} aria-current={active ? 'step' : undefined}>
              <span className="step-number">{completed ? <CheckIcon /> : String(index + 1).padStart(2, '0')}</span>
              <span className="step-name">{step}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
