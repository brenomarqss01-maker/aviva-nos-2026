import { eventConfig } from '../config/eventConfig'
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from './Icons'

interface WhatsAppRedirectProps {
  url: string
  onClose: () => void
}

export function WhatsAppRedirect({ url, onClose }: WhatsAppRedirectProps) {
  return (
    <div className="redirect-overlay" role="dialog" aria-modal="true" aria-labelledby="redirect-title">
      <div className="redirect-card">
        <div className="success-mark"><CheckIcon /></div>
        <span className="redirect-kicker">Tudo preenchido</span>
        <h2 id="redirect-title">Inscrição pronta!</h2>
        <p>Estamos te direcionando para o WhatsApp para confirmar sua inscrição com a equipe JUBRAC.</p>
        <a className="primary-button whatsapp-button" href={url} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> Abrir WhatsApp <ArrowRightIcon />
        </a>
        <p className="redirect-contact">Conversa com {eventConfig.whatsappDisplay}</p>
        <button type="button" className="text-button" onClick={onClose}>Voltar para a revisão</button>
      </div>
    </div>
  )
}
