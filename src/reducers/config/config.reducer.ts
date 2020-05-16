import {
  SELECT_WAVE,
  OCTAVE_INCREMENT,
  OCTAVE_DECREMENT,
  ConfigState,
  ConfigActionTypes,
  OctaveLevel
} from './config.types'

export const configInitState: ConfigState = {
  keyWaveMap: {
    1: 'sine',
    2: 'square',
    3: 'sawtooth',
    4: 'triangle'
  },
  waveForm: 'square',
  octaveLevel: 4
}

const configReducer = (state = configInitState, action: ConfigActionTypes) => {
  switch (action.type) {
    case SELECT_WAVE:
      return {
        ...state,
        waveForm: action.payload
      }
    case OCTAVE_INCREMENT:
      return {
        ...state,
        octaveLevel: Math.min(8, state.octaveLevel + 1) as OctaveLevel
      }
    case OCTAVE_DECREMENT:
      return {
        ...state,
        octaveLevel: Math.max(1, state.octaveLevel - 1) as OctaveLevel
      }
    default:
      return state
  }
}

export default configReducer
