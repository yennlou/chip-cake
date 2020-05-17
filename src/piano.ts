import { WaveForm, OctaveLevel } from './reducers/config'
import { Key, keyFreqMap } from './keys'

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)()
const masterGainNode = audioContext.createGain()
masterGainNode.connect(audioContext.destination)

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
