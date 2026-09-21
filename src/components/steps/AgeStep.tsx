import type { YesNo } from '../../types/registration'
import { formatPhone } from '../../utils/phone'
import { ChoiceCards } from '../ChoiceCards'
import { FormField } from '../FormField'
import { StepHeading } from '../StepHeading'
import type { StepProps } from './stepTypes'

export function AgeStep({ data, errors, setField }: StepProps) {
  const handleAdultChange = (value: string) => {
    const answer = value as YesNo
    setField('isAdult', answer)
    if (answer === 'yes') {
      setField('guardianName', '')
      setField('guardianPhone', '')
    }
  }

  return (
    <div className="step-panel">
      <StepHeading
        kicker="02 — Responsável"
        title="Sobre a sua idade"
        description="Essa informação nos ajuda a organizar a autorização de participantes menores."
      />

      <ChoiceCards
        name="isAdult"
        legend="Você é maior de 18 anos?"
        value={data.isAdult}
        onChange={handleAdultChange}
        error={errors.isAdult}
        choices={[
          { value: 'yes', title: 'Sim, sou maior de 18', description: 'Posso responder pela minha inscrição' },
          { value: 'no', title: 'Não, sou menor de 18', description: 'Vou informar um responsável' },
        ]}
      />

      {data.isAdult === 'no' && (
        <div className="conditional-panel" aria-live="polite">
          <div className="conditional-title">
            <span>Dados do responsável</span>
            <p>Utilizaremos esse contato para validação da autorização e, quando necessário, comunicação com o responsável.</p>
          </div>
          <FormField
            id="guardianName"
            label="Nome do responsável"
            placeholder="Nome completo"
            autoComplete="name"
            maxLength={120}
            value={data.guardianName}
            error={errors.guardianName}
            onChange={(event) => setField('guardianName', event.target.value)}
          />
          <FormField
            id="guardianPhone"
            label="Contato do responsável"
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel"
            maxLength={15}
            value={data.guardianPhone}
            error={errors.guardianPhone}
            onChange={(event) => setField('guardianPhone', formatPhone(event.target.value))}
          />
        </div>
      )}
    </div>
  )
}
