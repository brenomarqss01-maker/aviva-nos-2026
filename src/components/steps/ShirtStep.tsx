import { eventConfig } from '../../config/eventConfig'
import { shirtSizes } from '../../config/shirtConfig'
import type { ShirtColor, ShirtSize, YesNo } from '../../types/registration'
import { ChoiceCards } from '../ChoiceCards'
import { ShirtPreview } from '../ShirtPreview'
import { StepHeading } from '../StepHeading'
import type { StepProps } from './stepTypes'

export function ShirtStep({ data, errors, setField }: StepProps) {
  const handleWantsShirt = (value: string) => {
    const answer = value as YesNo
    setField('wantsShirt', answer)
    if (answer === 'no') {
      setField('shirtColor', '')
      setField('shirtSize', '')
    }
  }

  return (
    <div className="step-panel shirt-step">
      <StepHeading
        kicker="04 — Camiseta"
        title="Camiseta Aviva-Nos"
        description="Leve essa experiência com você. A compra é opcional e não interfere na sua inscrição."
      />

      <div className="price-card">
        <div>
          <span className="optional-badge">Compra opcional</span>
          <strong>Camiseta Aviva-Nos</strong>
          <p>A camiseta oficial possui o valor de R$ 50,00.</p>
        </div>
        <span className="price">{eventConfig.shirtPriceLabel}</span>
      </div>

      <ChoiceCards
        name="wantsShirt"
        legend="Deseja adquirir a camiseta?"
        value={data.wantsShirt}
        onChange={handleWantsShirt}
        error={errors.wantsShirt}
        choices={[
          { value: 'yes', title: 'Sim, quero a minha', description: 'Escolher modelo e tamanho' },
          { value: 'no', title: 'Não, obrigado', description: 'Continuar sem camiseta' },
        ]}
      />

      {data.wantsShirt === 'yes' && (
        <div className="shirt-configuration" aria-live="polite">
          <ShirtPreview
            selected={data.shirtColor}
            onSelect={(color: ShirtColor) => setField('shirtColor', color)}
            error={errors.shirtColor}
          />

          <fieldset className="size-selector" aria-describedby={errors.shirtSize ? 'shirtSize-error' : undefined}>
            <legend>Escolha seu tamanho</legend>
            <div className="size-options">
              {shirtSizes.map((size) => (
                <label className={data.shirtSize === size ? 'is-selected' : ''} key={size}>
                  <input
                    type="radio"
                    name="shirtSize"
                    value={size}
                    checked={data.shirtSize === size}
                    aria-invalid={Boolean(errors.shirtSize)}
                    onChange={() => setField('shirtSize', size as ShirtSize)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
            {errors.shirtSize && <p className="field-error" id="shirtSize-error" role="alert"><span aria-hidden="true">!</span>{errors.shirtSize}</p>}
          </fieldset>

          <div className="shirt-total">
            <span>Camiseta Aviva-Nos</span>
            <strong>{eventConfig.shirtPriceLabel}</strong>
          </div>
        </div>
      )}
    </div>
  )
}
