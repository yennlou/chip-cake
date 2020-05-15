import {
  WaveForm,
  SELECT_WAVE,
  OCTAVE_INCREMENT,
  OCTAVE_DECREMENT,
  SelectWaveAction,
  OctaveIncrementAction,
  OctaveDecrementAction
} from './config.types'

export const selectWave = (wave: WaveForm): SelectWaveAction => {
  return {
    type: SELECT_WAVE,
    payload: wave
  }
}

export const increaseOctave = (): OctaveIncrementAction => {
  return {
    type: OCTAVE_INCREMENT
  }
}

export const decreaseOctave = (): OctaveDecrementAction => {
  return {
    type: OCTAVE_DECREMENT
  }
}
