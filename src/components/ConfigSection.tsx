import { h } from 'preact'
import { useRef } from 'preact/compat'
import {
  WaveForm,
  ConfigState,
  ConfigActionTypes,
  selectWave
} from '../reducers/config'

interface ConfigSectionProps {
  config: ConfigState
  dispatch: (action: ConfigActionTypes) => void
}

const ConfigSection = ({ config, dispatch }: ConfigSectionProps) => {
  const selectWaveEl = useRef(null)
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
            <option value="sine">sine</option>
            <option value="square">square</option>
            <option value="sawtooth">sawtooth</option>
            <option value="triangle">triangle</option>
          </select>
        </li>
        <li class="config__control-octave">
          <button>+</button>
          <button>-</button>
        </li>
      </ul>
    </div>
  )
}

export default ConfigSection
