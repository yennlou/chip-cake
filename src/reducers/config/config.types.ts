export type WaveForm = 'sine' | 'square' | 'sawtooth' | 'triangle'

export interface KeyWaveMap {
  readonly [key: string]: WaveForm
}

export interface ConfigState {
  keyWaveMap: KeyWaveMap
  waveForm: WaveForm
  octaveLevel: number
}

export const SELECT_WAVE = 'SELECT_WAVE'
export const OCTAVE_INCREMENT = 'OCTAVE_INCREMENT'
export const OCTAVE_DECREMENT = 'OCTAVE_DECREMENT'

export interface SelectWaveAction {
  type: typeof SELECT_WAVE
  payload: WaveForm
}

export interface OctaveIncrementAction {
  type: typeof OCTAVE_INCREMENT
}

export interface OctaveDecrementAction {
  type: typeof OCTAVE_DECREMENT
}

export type ConfigActionTypes =
  | SelectWaveAction
  | OctaveIncrementAction
  | OctaveDecrementAction
