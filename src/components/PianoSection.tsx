import { h } from 'preact'
import { majorKeyFreqMap, minorKeyFreqMap } from '../keys'

const minorKeys = Object.keys(minorKeyFreqMap)
const majorKeys = Object.keys(majorKeyFreqMap)

const PianoSection = () => {
  return (
    <div className="piano">
      <div className="piano__minor">
        {minorKeys.map((k) => (
          <button className="piano__minor-key">{k}</button>
        ))}
      </div>
      <div className="piano__major">
        {majorKeys.map((k) => (
          <button className="piano__major-key">{k}</button>
        ))}
      </div>
    </div>
  )
}

export default PianoSection
