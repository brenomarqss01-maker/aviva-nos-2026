import { CheckIcon } from './Icons'

interface Choice {
  value: string
  title: string
  description?: string
}

interface ChoiceCardsProps {
  name: string
  legend: string
  value: string
  choices: Choice[]
  onChange: (value: string) => void
  error?: string
  compact?: boolean
}

export function ChoiceCards({ name, legend, value, choices, onChange, error, compact }: ChoiceCardsProps) {
  return (
    <fieldset className={`choice-group ${compact ? 'choice-group-compact' : ''}`} aria-describedby={error ? `${name}-error` : undefined}>
      <legend>{legend}</legend>
      <div className="choice-grid">
        {choices.map((choice) => {
          const selected = value === choice.value
          return (
            <label key={choice.value} className={`choice-card ${selected ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                value={choice.value}
                checked={selected}
                aria-invalid={Boolean(error)}
                onChange={() => onChange(choice.value)}
              />
              <span className="choice-check" aria-hidden="true">{selected && <CheckIcon />}</span>
              <span>
                <strong>{choice.title}</strong>
                {choice.description && <small>{choice.description}</small>}
              </span>
            </label>
          )
        })}
      </div>
      {error && <p className="field-error" id={`${name}-error`} role="alert"><span aria-hidden="true">!</span>{error}</p>}
    </fieldset>
  )
}
