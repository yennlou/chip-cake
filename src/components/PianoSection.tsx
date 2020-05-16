import { h } from 'preact'

const minorKeys = ['e', 'r', 'y', 'u', 'i']
const majorKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']

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
