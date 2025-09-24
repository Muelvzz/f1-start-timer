import { useState, useEffect } from 'react'
import Lights from './Lights'

export default function App() {
  const [startLights, setStartLights] = useState(false)
  const [runTimer, setRunTimer] = useState(false)

  // spacebar press handler
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        if (!startLights && !runTimer) {
          setStartLights(true)  // start lights sequence
        } else if (runTimer) {
          setRunTimer(false)   // stop timer
          setStartLights(false)
        }
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
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
