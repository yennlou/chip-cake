import {
  SELECT_WAVE,
  OCTAVE_INCREMENT,
  OCTAVE_DECREMENT,
  ConfigState,
  ConfigActionTypes
} from './config.types'

export const configInitState: ConfigState = {
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
        octaveLevel: Math.min(8, state.octaveLevel + 1)
      }
    case OCTAVE_DECREMENT:
      return {
        ...state,
        octaveLevel: Math.max(1, state.octaveLevel - 1)
      }
    default:
      return state
  }
}

export default configReducer
