export const majorKeyList = [
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p'
]
export const majorNoteList = [
  174.614,
  195.998,
  220.0,
  246.942,
  261.626,
  293.665,
  329.628,
  349.228,
  391.995,
  440.0,
  493.883,
  523.251,
  587.33,
  659.255
]

export const minorKeyList = ['s', 'd', 'f', 'h', 'j', '5', '6', '7', '9', '0']
export const minorNoteList = [
  184.997,
  207.652,
  233.082,
  277.183,
  311.127,
  369.994,
  415.305,
  466.164,
  554.365,
  622.254
]
export const majorKeyFreqMap = majorKeyList.reduce(
  (o, k, i) => ({ ...o, [k]: majorNoteList[i] }),
  {}
)
export const minorKeyFreqMap = minorKeyList.reduce(
  (o, k, i) => ({ ...o, [k]: minorNoteList[i] }),
  {}
)

export const keyFreqMap = { ...majorKeyFreqMap, ...minorKeyFreqMap }
export const keyList = Object.keys(keyFreqMap)

export type Key = keyof typeof keyFreqMap
