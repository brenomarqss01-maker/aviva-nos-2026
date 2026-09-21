import { useEffect, useRef } from 'react'
import { Hero } from './components/Hero'
import { RegistrationFlow } from './components/RegistrationFlow'

export default function App() {
  const registrationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.location.hash === '#inscricao') {
      requestAnimationFrame(() => registrationRef.current?.scrollIntoView({ block: 'start' }))
    }
  }, [])

  const startRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <Hero onStart={startRegistration} />
      <RegistrationFlow sectionRef={registrationRef} />
    </main>
  )
}
