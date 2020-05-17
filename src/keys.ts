export const majorKeyFreqMap = {
  z: 261.626,
  x: 293.665,
  c: 329.628,
  v: 349.228,
  b: 391.995,
  n: 440.0,
  m: 493.883,
  r: 523.251,
  t: 587.33,
  y: 659.255,
  u: 698.456,
  i: 783.991,
  o: 880.0,
  p: 987.767
}

export const minorKeyFreqMap = {
  s: 277.183,
  d: 311.127,
  g: 369.994,
  h: 415.305,
  j: 466.164,
  5: 554.365,
  6: 622.254,
  8: 739.989,
  9: 830.609,
  0: 932.328
}

export const keyFreqMap = { ...majorKeyFreqMap, ...minorKeyFreqMap }

export type Key = keyof typeof keyFreqMap
