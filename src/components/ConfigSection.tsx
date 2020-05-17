import { h } from 'preact'
import { useRef } from 'preact/compat'
import {
  WaveForm,
  ConfigState,
  ConfigActionTypes,
  selectWave,
  increaseOctave,
  decreaseOctave
} from '../reducers/config'

interface ConfigSectionProps {
  config: ConfigState
  dispatch: (action: ConfigActionTypes) => void
}

const ConfigSection = ({ config, dispatch }: ConfigSectionProps) => {
  const selectWaveEl = useRef(null)
  const { keyWaveMap, waveForm, octaveLevel } = config
  return (
    <div className="config">
      <ul>
        <li class="config__select-wave">
          <select
            ref={selectWaveEl}
            value={config.waveForm}
            onChange={(e) => {
              ;(selectWaveEl.current! as HTMLSelectElement).blur()
              dispatch(
                selectWave((e.target! as HTMLSelectElement).value as WaveForm)
              )
            }}
          >
            {Object.keys(keyWaveMap).map((key) => (
              <option value={keyWaveMap[key]}>{keyWaveMap[key]}</option>
            ))}
          </select>
        </li>
        <li class="config__control-octave">
          <button
            onClick={(e) => {
              dispatch(decreaseOctave())
            }}
          >
            -
          </button>
          <button
            onClick={(e) => {
              dispatch(increaseOctave())
            }}
          >
            +
          </button>
        </li>
        <li style="margin-right: auto;"></li>
        <li className="config__info">Wave: {waveForm}</li>
        <li className="config__info">Octave: {octaveLevel}</li>
      </ul>
    </div>
  )
}

export default ConfigSection
