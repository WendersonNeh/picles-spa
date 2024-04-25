import { useState } from 'react'
import { Button } from './components/common/Button'
import { ButtonVariant } from './components/common/Button/Button.constants'

export function App() {
  const [] = useState(0)

  return (
    <>
      <Button variant={ButtonVariant.Default}>Quero adotar</Button>

      <Button variant={ButtonVariant.Outlined}>Tenho um abrigo</Button>
    </>
  )
}
