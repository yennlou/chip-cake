import { h } from 'preact'
import { majorKeyList, minorKeyList } from '../keys'

const PianoSection = () => {
  return (
    <div className="piano">
      <div className="piano__minor">
        {minorKeyList.map((k) => (
          <button className="piano__minor-key">{k}</button>
        ))}
      </div>
      <div className="piano__major">
        {majorKeyList.map((k) => (
          <button className="piano__major-key">{k}</button>
        ))}
      </div>
    </div>
  )
}

export default PianoSection
