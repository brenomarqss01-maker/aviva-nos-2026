import { eventConfig } from '../../config/eventConfig'
import { shirts } from '../../config/shirtConfig'
import type { StepProps } from './stepTypes'
import { StepHeading } from '../StepHeading'
import { WhatsAppIcon } from '../Icons'
import { yesNoLabel } from '../../utils/text'

interface ReviewStepProps extends StepProps {
  onEdit: (step: number) => void
  onSubmit: () => void
}

interface ReviewSectionProps {
  title: string
  step: number
  onEdit: (step: number) => void
  children: React.ReactNode
}

function ReviewSection({ title, step, onEdit, children }: ReviewSectionProps) {
  return (
    <section className="review-section">
      <header>
        <h3>{title}</h3>
        <button type="button" onClick={() => onEdit(step)}>Editar</button>
      </header>
      <dl>{children}</dl>
    </section>
  )
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>
}

export function ReviewStep({ data, errors, setField, onEdit, onSubmit }: ReviewStepProps) {
  const shirtLabel = shirts.find((shirt) => shirt.id === data.shirtColor)?.label ?? '—'

  return (
    <div className="step-panel review-step">
      <StepHeading
        kicker="05 — Revisão"
        title="Confira sua inscrição"
        description="Revise com calma. Se precisar, você pode voltar e editar qualquer seção."
      />

      <div className="review-list">
        <ReviewSection title="Dados pessoais" step={0} onEdit={onEdit}>
          <ReviewItem label="Nome" value={`${data.firstName} ${data.lastName}`.trim()} />
          <ReviewItem label="Celular" value={data.phone} />
          <ReviewItem label="Quem convidou" value={data.invitedBy || 'Não informado'} />
        </ReviewSection>

        <ReviewSection title="Idade / responsável" step={1} onEdit={onEdit}>
          <ReviewItem label="Maior de 18" value={yesNoLabel(data.isAdult)} />
          {data.isAdult === 'no' && <>
            <ReviewItem label="Responsável" value={data.guardianName} />
            <ReviewItem label="Contato" value={data.guardianPhone} />
          </>}
        </ReviewSection>

        <ReviewSection title="Alimentação" step={2} onEdit={onEdit}>
          <ReviewItem label="Possui alergia" value={yesNoLabel(data.hasAllergies)} />
          {data.hasAllergies === 'yes' && <ReviewItem label="Alergia(s)" value={data.allergies} />}
        </ReviewSection>

        <ReviewSection title="Camiseta" step={3} onEdit={onEdit}>
          <ReviewItem label="Deseja camiseta" value={yesNoLabel(data.wantsShirt)} />
          {data.wantsShirt === 'yes' && <>
            <ReviewItem label="Modelo / cor" value={shirtLabel} />
            <ReviewItem label="Tamanho" value={data.shirtSize} />
            <ReviewItem label="Valor" value={eventConfig.shirtPriceLabel} />
          </>}
        </ReviewSection>
      </div>

      <label className={`confirmation-check ${data.confirmed ? 'is-checked' : ''} ${errors.confirmed ? 'has-error' : ''}`}>
        <input
          id="confirmed"
          type="checkbox"
          checked={data.confirmed}
          aria-invalid={Boolean(errors.confirmed)}
          aria-describedby={errors.confirmed ? 'confirmed-error' : undefined}
          onChange={(event) => setField('confirmed', event.target.checked)}
        />
        <span className="custom-checkbox" aria-hidden="true">{data.confirmed && '✓'}</span>
        <span>Confirmo que revisei as informações fornecidas e que os dados estão corretos.</span>
      </label>
      {errors.confirmed && <p className="field-error" id="confirmed-error" role="alert"><span aria-hidden="true">!</span>{errors.confirmed}</p>}

      <button type="button" className="primary-button finish-button" onClick={onSubmit}>
        <WhatsAppIcon /> Finalizar inscrição
      </button>
      <p className="finish-note">Você será direcionado ao WhatsApp para confirmar o envio com a equipe JUBRAC.</p>
    </div>
  )
}
