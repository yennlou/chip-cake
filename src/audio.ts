import { WaveForm, OctaveLevel } from './reducers/config'
import { Key, keyFreqMap } from './reducers/piano/piano.types'

class Synthesizer {
  private c: AudioContext
  private wave: WaveForm
  private output?: AudioNode
  private freqOscMap: { [freq: number]: OscillatorNode | null } = {}
  constructor(audioContext: AudioContext, wave: WaveForm) {
    this.c = audioContext
    this.wave = wave
  }

  connect(audioNode: AudioNode) {
    this.output = audioNode
  }

  play(freq: number) {
    if (this.freqOscMap[freq]) return freq
    const osc = this.c.createOscillator()
    if (!this.output) {
      throw Error('The synthesizer needs an output')
    }
    osc.connect(this.output)
    osc.type = this.wave
    osc.frequency.value = freq
    this.freqOscMap[freq] = osc
    osc.start()
    return freq
  }

  stop(freq: number) {
    if (this.freqOscMap[freq]) {
      this.freqOscMap[freq]?.stop()
    }
    this.freqOscMap[freq] = null
  }
}

const key2freq = (key: Key, octave: OctaveLevel = 4) => {
  return keyFreqMap[key] * Math.pow(2, octave - 4)
}

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)()
const gainNode = audioContext.createGain()
const analyserNode = audioContext.createAnalyser()

gainNode.connect(analyserNode)
analyserNode.connect(audioContext.destination)

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

export { instruments, key2freq, Synthesizer }
