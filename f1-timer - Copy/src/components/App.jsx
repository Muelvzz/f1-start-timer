import { useState, useEffect } from 'react'
import Lights from './Lights'

export default function App() {
  // states used for re-rendering
  const [startLights, setStartLights] = useState(false)
  const [runTimer, setRunTimer] = useState(false)

  // handles the user's input either by a spacebar or a tap/click.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        if (!startLights && !runTimer) {
          setStartLights(true) 
        } else if (runTimer) {
          setRunTimer(false)
          setStartLights(false)
        }
      }
    }

    const handlePointer = () => {
      if (!startLights && !runTimer) {
        setStartLights(true) 
      } else if (runTimer) {
        setRunTimer(false)
        setStartLights(false)
      }
    }

    window.addEventListener("keydown", handleKey)
    window.addEventListener("pointerdown", handlePointer)

    // this is crucial so as to avoid leaks and unpredictability.
    return () => {
      window.removeEventListener("keydown", handleKey),
      window.removeEventListener("pointerdown", handlePointer)
    }
  }, [startLights, runTimer])

  return (
    <>
      <Lights 
        startLights={startLights} 
        runTimer={runTimer}
        onLightsOut={() => setRunTimer(true)}
      />
    </>
  )
}
