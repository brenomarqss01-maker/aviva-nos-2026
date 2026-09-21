import { shirts } from '../config/shirtConfig'
import type { ShirtColor } from '../types/registration'
import { CheckIcon } from './Icons'

interface ShirtPreviewProps {
  selected: ShirtColor
  onSelect: (color: ShirtColor) => void
  error?: string
}

export function ShirtPreview({ selected, onSelect, error }: ShirtPreviewProps) {
  const activeShirt = shirts.find((shirt) => shirt.id === selected) ?? shirts[0]

  return (
    <fieldset className="shirt-showcase" aria-describedby={error ? 'shirtColor-error' : undefined}>
      <legend>Escolha a referência de cor</legend>
      <div className="shirt-preview">
        <img
          key={activeShirt.id}
          src={activeShirt.image}
          alt={activeShirt.alt}
          width="1280"
          height="1280"
        />
        <span className="reference-tag">Imagem de referência</span>
      </div>
      <div className="shirt-information">
        <p className="shirt-note">Selecione uma das referências disponíveis neste momento.</p>
        <div className="shirt-options">
          {shirts.map((shirt) => {
            const isSelected = shirt.id === selected
            return (
              <label className={`shirt-option ${isSelected ? 'is-selected' : ''}`} key={shirt.id}>
                <input
                  type="radio"
                  name="shirtColor"
                  value={shirt.id}
                  checked={isSelected}
                  aria-invalid={Boolean(error)}
                  onChange={() => onSelect(shirt.id)}
                />
                <img src={shirt.image} alt="" width="80" height="80" loading="lazy" />
                <span>{shirt.label}</span>
                <span className="shirt-option-check" aria-hidden="true">{isSelected && <CheckIcon />}</span>
              </label>
            )
          })}
        </div>
      </div>
      {error && <p className="field-error" id="shirtColor-error" role="alert"><span aria-hidden="true">!</span>{error}</p>}
    </fieldset>
  )
}
