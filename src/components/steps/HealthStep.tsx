import type { YesNo } from '../../types/registration'
import { ChoiceCards } from '../ChoiceCards'
import { FormField } from '../FormField'
import { StepHeading } from '../StepHeading'
import type { StepProps } from './stepTypes'

export function HealthStep({ data, errors, setField }: StepProps) {
  const handleAllergyChange = (value: string) => {
    const answer = value as YesNo
    setField('hasAllergies', answer)
    if (answer === 'no') setField('allergies', '')
  }

  return (
    <div className="step-panel">
      <StepHeading
        kicker="03 — Alimentação"
        title="Queremos cuidar bem de você"
        description="Conte apenas o necessário para a equipe considerar seus cuidados durante o acampamento."
      />

      <ChoiceCards
        name="hasAllergies"
        legend="Possui alergia a algum alimento?"
        value={data.hasAllergies}
        onChange={handleAllergyChange}
        error={errors.hasAllergies}
        compact
        choices={[
          { value: 'yes', title: 'Sim' },
          { value: 'no', title: 'Não' },
        ]}
      />

      {data.hasAllergies === 'yes' && (
        <div className="conditional-panel" aria-live="polite">
          <FormField
            id="allergies"
            label="Qual ou quais?"
            hint="Essa informação será utilizada pela organização para auxiliar nos cuidados durante o acampamento."
            placeholder="Conte para nós quais alimentos precisam ser evitados..."
            rows={5}
            maxLength={600}
            value={data.allergies}
            error={errors.allergies}
            onChange={(event) => setField('allergies', event.target.value)}
            multiline
          />
          <div className="character-count" aria-live="polite">{data.allergies.length}/600</div>
        </div>
      )}
    </div>
  )
}
