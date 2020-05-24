import { h } from 'preact'
import { useEffect, useRef } from 'preact/compat'
import { interval } from 'rxjs'
import { Analyser } from '../audio'

interface StatusSectionProps {
  analyser: Analyser
}

const updateWave = (analyser: Analyser, canvas: HTMLCanvasElement) => {
  const amplitudeArray = analyser.getTimeDomainData()
  const ctx = canvas.getContext('2d')!
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  canvas.width = width
  canvas.height = height
  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = '#243137'
  ctx.moveTo(0, height / 2)
  amplitudeArray.forEach((amplitude, idx) => {
    const x = (idx * width) / 1024
    const y = (height - 40) * (1 - amplitude / 256) + 20
    ctx.lineTo(x, y)
  })
  ctx.stroke()
}

const StatusSection = ({ analyser }: StatusSectionProps) => {
  const canvasEl = useRef(null)
  useEffect(() => {
    const timer$ = interval(300)
    const sub = timer$.subscribe(() => {
      updateWave(analyser, canvasEl.current!)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [])
  return (
    <div className="status">
      <div className="status__wave">
        <canvas ref={canvasEl}></canvas>
      </div>
    </div>
  )
}

export default StatusSection
