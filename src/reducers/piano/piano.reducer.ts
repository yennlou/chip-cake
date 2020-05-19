import {
  PianoState,
  KeyPressMap,
  keyList,
  PIANO_KEY_DOWN,
  PIANO_KEY_UP,
  PianoActionTypes
} from './piano.types'

export const pianoInitState: PianoState = {
  keyPressMap: keyList.reduce(
    (acc, k) => ({ ...acc, [k]: false }),
    {}
  ) as KeyPressMap
}

const pianoReducer = (state = pianoInitState, action: PianoActionTypes) => {
  switch (action.type) {
    case PIANO_KEY_DOWN:
      return {
        ...state,
        keyPressMap: {
          ...state.keyPressMap,
          [action.payload]: true
        }
      }
    case PIANO_KEY_UP:
      return {
        ...state,
        keyPressMap: {
          ...state.keyPressMap,
          [action.payload]: false
        }
      }
    default:
      return state
  }
}

export default pianoReducer
