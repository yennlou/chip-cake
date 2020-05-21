import { h } from 'preact'
import { useEffect } from 'preact/compat'
import { interval } from 'rxjs'

interface StatusSectionProps {
  analyserNode: AnalyserNode
}

const StatusSection = ({ analyserNode }: StatusSectionProps) => {
  useEffect(() => {
    const timer$ = interval(1000)
    const sub = timer$.subscribe(() => {
      const amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount)
      analyserNode.getByteTimeDomainData(amplitudeArray)
      // console.log(amplitudeArray)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [])
  return <div className="status"></div>
}

export default StatusSection
