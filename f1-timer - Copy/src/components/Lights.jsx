import { useEffect, useState } from 'react'
import '../css/lights.css'

export default function Lights(props) {
  const [time, setTime] = useState(0)
  const [currentColumn, setCurrentColumn] = useState(-1)
  const [bestTime, setBestTime] = useState(0)
  const timeFromLocalStorage = JSON.parse( localStorage.getItem("bestTime") )
  const COLUMNS = 5
  const ROWS = 4

  // handles an event to check what is the best time saved.
  useEffect(() => {
    if (timeFromLocalStorage) {
      setBestTime(timeFromLocalStorage)
    }
  }, [])

  // handles an event if the saved best time on local storage was surpassed.
  useEffect(() => {
    if (bestTime > 0) {
      localStorage.setItem("bestTime", JSON.stringify(bestTime))
    }
  }, [bestTime])

  // handles the countdown for the lights to switch into red.
  useEffect(() => {
    let interval
    if (props.startLights) {
      setCurrentColumn(-1)
      let col = -1
      interval = setInterval(() => {
        col += 1
        if (col < COLUMNS) {
          setCurrentColumn(col)
        } else {
          clearInterval(interval)
          props.onLightsOut?.()
        }
      }, 1000)
    } else {
      setCurrentColumn(-1)
    }
    return () => clearInterval(interval)
  }, [props.startLights])

  // handles the timer which yu'll see in the game
  useEffect(() => {
    let interval
    if (props.runTimer) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    } else {
      if (time > 0) {
          if (bestTime === 0 || time < bestTime) {
            setBestTime(time)
          }
          setTime(0)
        }
      }
    return () => clearInterval(interval)
  }, [props.runTimer])

  const formattedTime = (time / 1000).toFixed(3)

  return (
    <>
      <div className="lights-container">
        {Array.from({ length: COLUMNS }).map((_, stripIndex) => (
          <div key={stripIndex} className="light-strip">
            {Array.from({ length: ROWS }).map((_, rowIndex) => {
              const isBottomTwo = rowIndex >= ROWS - 2
              const isLit = stripIndex <= currentColumn && isBottomTwo
              return (
                <div
                  key={`${stripIndex}-${rowIndex}`}
                  className="light"
                  style={{ backgroundColor: isLit ? 'red' : 'grey' }}
                />
              )
            })}
          </div>
        ))}
      </div>

      <p id="instruction">
        <u>Tap</u> or hit "<u>space</u>" to start, then <u>tap</u> or hit "<u>space</u>" again when the lights go out.
      </p>
      <h1 id="timer">{formattedTime}</h1>
      <p id="credits">Personal Best: {(bestTime / 1000).toFixed(3) }</p>
      <p id="credits">
        Created by <a href="https://github.com/Muelvzz">Muelvin Lopez</a>. Based from this{' '}
        <a href="https://f1-start.jakearchibald.com/">F1 Start Timer</a>
      </p>
    </>
  )
}
