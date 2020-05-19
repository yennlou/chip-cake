// prettier-ignore
export type Key = 'z' | 'x' | 'c' | 'v' | 'b' | 'n' | 'm' | 'r'
  | 't' | 'y' | 'u' | 'i' | 'o' | 'p' | 's' | 'd' | 'f' | 'h' | 'j'
  | '5' | '6' | '7' | '9' | '0'

// prettier-ignore
export const majorKeyList: Key[] = [ 'z', 'x', 'c', 'v', 'b', 'n',
  'm', 'r', 't', 'y', 'u', 'i', 'o', 'p']

// prettier-ignore
export const majorNoteList: number[] = [ 174.614, 195.998, 220.0,
  246.942, 261.626, 293.665, 329.628, 349.228, 391.995, 440.0,
  493.883, 523.251, 587.33, 659.255 ]

// prettier-ignore
export const minorKeyList: Key[] = [ 's', 'd', 'f', 'h', 'j', '5',
  '6', '7', '9', '0']

// prettier-ignore
export const minorNoteList: number[] = [ 184.997, 207.652, 233.082,
  277.183, 311.127, 369.994, 415.305, 466.164, 554.365, 622.254]

export const majorKeyFreqMap = majorKeyList.reduce(
  (o, k, i) => ({ ...o, [k]: majorNoteList[i] }),
  {}
) as { [key in Key]: number }
export const minorKeyFreqMap = minorKeyList.reduce(
  (o, k, i) => ({ ...o, [k]: minorNoteList[i] }),
  {}
) as { [key in Key]: number }

export const keyFreqMap = { ...majorKeyFreqMap, ...minorKeyFreqMap }
export const keyList = Object.keys(keyFreqMap)

export type KeyPressMap = { [key in Key]: boolean }

export interface PianoState {
  keyPressMap: KeyPressMap
}

export const PIANO_KEY_DOWN = 'KEY_DOWN'
export const PIANO_KEY_UP = 'KEY_UP'

export interface PianoKeyDownAction {
  type: typeof PIANO_KEY_DOWN
  payload: Key
}

export interface PianoKeyUpAction {
  type: typeof PIANO_KEY_UP
  payload: Key
}

export type PianoActionTypes = PianoKeyDownAction | PianoKeyUpAction
