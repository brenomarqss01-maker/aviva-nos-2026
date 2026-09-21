interface StepHeadingProps {
  kicker: string
  title: string
  description: string
}

export function StepHeading({ kicker, title, description }: StepHeadingProps) {
  return (
    <header className="step-heading">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  )
}
