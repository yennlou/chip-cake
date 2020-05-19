import {
  Key,
  PIANO_KEY_DOWN,
  PIANO_KEY_UP,
  PianoKeyDownAction,
  PianoKeyUpAction
} from './piano.types'

export const pianoKeyDown = (key: Key): PianoKeyDownAction => {
  return {
    type: PIANO_KEY_DOWN,
    payload: key
  }
}

export const pianoKeyUp = (key: Key): PianoKeyUpAction => {
  return {
    type: PIANO_KEY_UP,
    payload: key
  }
}
