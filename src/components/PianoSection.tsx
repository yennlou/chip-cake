import { h } from 'preact'
import classNames from 'classnames'
import { majorKeyList, minorKeyList, Key } from '../reducers/piano/piano.types'

interface PianoSectionProps {
  pianoState: {
    [key in Key]: boolean
  }
}

const PianoSection = ({ pianoState }: PianoSectionProps) => {
  return (
    <div className="piano">
      <div className="piano__minor">
        {minorKeyList.map((k) => (
          <button
            className={classNames('piano__minor-key', {
              active: pianoState[k as Key]
            })}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="piano__major">
        {majorKeyList.map((k) => (
          <button
            className={classNames('piano__major-key', {
              active: pianoState[k as Key]
            })}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PianoSection
