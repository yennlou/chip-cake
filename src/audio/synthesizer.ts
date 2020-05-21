import { WaveForm } from '../reducers/config'
export class Synthesizer {
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
