export class Analyser {
  constructor(private analyserNode: AnalyserNode) {}

  getTimeDomainData() {
    const amplitudeArray = new Uint8Array(this.analyserNode.frequencyBinCount)
    this.analyserNode.getByteTimeDomainData(amplitudeArray)
    return amplitudeArray
  }
}
