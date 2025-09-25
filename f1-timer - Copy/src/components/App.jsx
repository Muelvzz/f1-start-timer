import { useState, useEffect } from 'react'
import Lights from './Lights'

export default function App() {
  const [startLights, setStartLights] = useState(false)
  const [runTimer, setRunTimer] = useState(false)

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
