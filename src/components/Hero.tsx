import { eventConfig } from '../config/eventConfig'
import { ArrowRightIcon } from './Icons'

interface HeroProps {
  onStart: () => void
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-shape hero-shape-light" aria-hidden="true" />
      <div className="hero-shape hero-shape-wine" aria-hidden="true" />
      <div className="hero-ghost" aria-hidden="true">AVIVA<br />NOS</div>

      <header className="hero-nav page-shell">
        <div className="organizer-mark">
          <span className="organizer-dot" aria-hidden="true" />
          <span>JUBRAC</span>
        </div>
        <span className="year-mark">MMXXVI</span>
      </header>

      <div className="hero-content page-shell">
        <div className="hero-copy">
          <div className="open-badge hero-reveal hero-reveal-1">
            <span aria-hidden="true" /> Inscrições abertas
          </div>
          <p className="eyebrow hero-reveal hero-reveal-2">JUBRAC apresenta</p>
          <h1 id="hero-title" className="hero-title hero-reveal hero-reveal-3">
            <span>Acampamento</span>
            <strong>Aviva-Nos</strong>
            <em>2026</em>
          </h1>
          <p className="hero-description hero-reveal hero-reveal-4">
            Uma experiência para viver, compartilhar<br className="desktop-only" /> e ser transformado.
          </p>
          <button type="button" className="primary-button hero-cta hero-reveal hero-reveal-5" onClick={onStart}>
            Fazer minha inscrição
            <span className="button-icon"><ArrowRightIcon /></span>
          </button>
        </div>

        <div className="hero-art hero-reveal hero-reveal-4" aria-label="Arte oficial do Acampamento Aviva-Nos">
          <div className="poster-frame">
            <img src={eventConfig.bannerImage} alt="Banner oficial do Acampamento Aviva-Nos" fetchPriority="high" />
          </div>
          <span className="poster-caption">Uma geração em movimento</span>
        </div>
      </div>

      <div className="hero-footer page-shell">
        <span>Desça para começar</span>
        <span className="scroll-line" aria-hidden="true" />
      </div>
    </section>
  )
}
