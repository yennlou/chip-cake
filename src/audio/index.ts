import { WaveForm, OctaveLevel } from '../reducers/config'
import { Key, keyFreqMap } from '../reducers/piano/piano.types'
import { Synthesizer } from './synthesizer'

const key2freq = (key: Key, octave: OctaveLevel = 4) => {
  return keyFreqMap[key] * Math.pow(2, octave - 4)
}

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)()
const gainNode = audioContext.createGain()
const analyserNode = audioContext.createAnalyser()

gainNode.connect(analyserNode).connect(audioContext.destination)

const pianoSine = new Synthesizer(audioContext, 'sine')
const pianoTriangle = new Synthesizer(audioContext, 'triangle')
const pianoSquare = new Synthesizer(audioContext, 'square')
const pianoSawtooth = new Synthesizer(audioContext, 'sawtooth')

const instruments: { [key in WaveForm]: Synthesizer } = {
  sine: pianoSine,
  triangle: pianoTriangle,
  square: pianoSquare,
  sawtooth: pianoSawtooth
}

Object.values(instruments).forEach((instrument) => {
  instrument.connect(gainNode)
})

export { instruments, key2freq, Synthesizer, analyserNode }
