import { h } from 'preact'
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
  return (
    <div className="config">
      <ul>
        <li class="config__select-wave">
          <select
            value={config.waveForm}
            onChange={(e) =>
              dispatch(
                selectWave((e.target! as HTMLSelectElement).value as WaveForm)
              )
            }
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
