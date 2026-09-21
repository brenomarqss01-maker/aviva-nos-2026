import { FormField } from '../FormField'
import { StepHeading } from '../StepHeading'
import { formatPhone } from '../../utils/phone'
import type { StepProps } from './stepTypes'

export function PersonalDataStep({ data, errors, setField }: StepProps) {
  return (
    <div className="step-panel">
      <StepHeading
        kicker="01 — Seus dados"
        title="Vamos começar por você"
        description="Preencha seus dados para a equipe JUBRAC identificar sua inscrição."
      />

      <div className="form-grid two-columns">
        <FormField
          id="firstName"
          label="Primeiro nome"
          placeholder="Como podemos te chamar?"
          autoComplete="given-name"
          maxLength={60}
          value={data.firstName}
          error={errors.firstName}
          onChange={(event) => setField('firstName', event.target.value)}
        />
        <FormField
          id="lastName"
          label="Sobrenome"
          placeholder="Seu sobrenome"
          autoComplete="family-name"
          maxLength={80}
          value={data.lastName}
          error={errors.lastName}
          onChange={(event) => setField('lastName', event.target.value)}
        />
      </div>

      <FormField
        id="invitedBy"
        label="Quem te convidou?"
        optional
        hint="Caso tenha sido convidado por algum jovem da OBPC, informe o nome."
        placeholder="Nome da pessoa"
        maxLength={120}
        value={data.invitedBy}
        onChange={(event) => setField('invitedBy', event.target.value)}
      />

      <FormField
        id="phone"
        label="Número de celular"
        hint="Número para contato e mais informações com a equipe JUBRAC."
        placeholder="(00) 00000-0000"
        inputMode="tel"
        autoComplete="tel-national"
        maxLength={15}
        value={data.phone}
        error={errors.phone}
        onChange={(event) => setField('phone', formatPhone(event.target.value))}
      />
    </div>
  )
}
