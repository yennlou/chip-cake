const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)()
const masterGainNode = audioContext.createGain()
masterGainNode.connect(audioContext.destination)

const playTone = (freq = 444) => {
  let osc = audioContext.createOscillator()
  osc.connect(masterGainNode)
  osc.type = 'sine'
  osc.frequency.value = freq
  osc.start()
  return osc
}

const stopTone = (osc: OscillatorNode) => {
  osc.stop()
}

export { playTone, stopTone }
