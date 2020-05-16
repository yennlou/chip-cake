import { WaveForm, OctaveLevel } from './reducers/config'

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)()
const masterGainNode = audioContext.createGain()
masterGainNode.connect(audioContext.destination)

type Key = 'a' | 's' | 'd' | 'f' | 'g' | 'h' | 'j' | 'k' | 'l'

const keyFreqMap = {
  a: 247,
  s: 262,
  d: 294,
  f: 330,
  g: 349,
  h: 392,
  j: 440,
  k: 494,
  l: 523
}

const key2freq = (key: Key, octave: OctaveLevel = 4) => {
  return keyFreqMap[key] * Math.pow(2, octave - 4)
}

const getKeyList = () => {
  return Object.keys(keyFreqMap)
}

const playTone = (freq: number, wave: WaveForm) => {
  let osc = audioContext.createOscillator()
  osc.connect(masterGainNode)
  osc.type = wave
  osc.frequency.value = freq
  osc.start()
  return osc
}

const stopTone = (osc: OscillatorNode) => {
  osc.stop()
}

export { playTone, stopTone, key2freq, getKeyList, Key }
