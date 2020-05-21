import { h } from 'preact'
import { useEffect } from 'preact/compat'
import { interval } from 'rxjs'
import { Analyser } from '../audio'

interface StatusSectionProps {
  analyser: Analyser
}

const StatusSection = ({ analyser }: StatusSectionProps) => {
  useEffect(() => {
    const timer$ = interval(1000)
    const sub = timer$.subscribe(() => {
      // console.log(analyser.getTimeDomainData())
    })
    return () => {
      sub.unsubscribe()
    }
  }, [])
  return (
    <div className="status">
      <div className="status__wave">
        <canvas></canvas>
      </div>
    </div>
  )
}

export default StatusSection
