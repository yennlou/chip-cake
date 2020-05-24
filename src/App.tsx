import { h } from 'preact'
import { useEffect, useReducer } from 'preact/compat'
import { fromEvent, merge, Observable } from 'rxjs'
import { pluck, filter, tap, share } from 'rxjs/operators'

import configReducer, {
  configInitState,
  selectWave,
  increaseOctave,
  decreaseOctave
} from './reducers/config'
import pianoReducer, {
  pianoInitState,
  pianoKeyUp,
  pianoKeyDown
} from './reducers/piano'
import { keyList, Key } from './reducers/piano/piano.types'
import { instruments, key2freq, Synthesizer, analyser } from './audio'

import NoteSection from './components/NoteSection'
import PianoSection from './components/PianoSection'
import WaveSection from './components/WaveSection'

import './styles/main.scss'

const keyNoteMap: {
  [key in Key]?: { instrument: Synthesizer; freq: number } | null
} = {}

const App = () => {
  const [pianoState, pianoDispatch] = useReducer(pianoReducer, pianoInitState)
  const [configState, configDispatch] = useReducer(
    configReducer,
    configInitState
  )

  const { keyWaveMap, octaveLevel, waveForm } = configState

  useEffect(() => {
    const key$ = merge(
      fromEvent(document, 'keydown'),
      fromEvent(document, 'keyup')
    ).pipe(
      // tap(console.log),
      share()
    )

    const keydown$: Observable<string> = key$.pipe(
      filter((e) => e.type === 'keydown'),
      pluck('key')
    )

    const notePlaySub = key$
      .pipe(filter((e) => keyList.includes((e as KeyboardEvent).key)))
      .subscribe((e: any) => {
        const key = e.key as Key
        const instrument = instruments[waveForm]
        if (e.type === 'keydown') {
          pianoDispatch(pianoKeyDown(key))
          const freq = instrument.play(key2freq(key, octaveLevel))
          keyNoteMap[key] = { instrument, freq }
        } else if (e.type === 'keyup') {
          pianoDispatch(pianoKeyUp(key))
          if (keyNoteMap[key]) {
            const { instrument, freq } = keyNoteMap[key]!
            instrument.stop(freq)
          }
          keyNoteMap[key] = null
        }
      })

    const waveControlSub = keydown$
      .pipe(filter((key) => Object.keys(keyWaveMap).includes(key)))
      .subscribe((key) => {
        configDispatch(selectWave(keyWaveMap[key]))
      })

    const octaveControlSub = keydown$
      .pipe(filter((key) => ['=', '-'].includes(key)))
      .subscribe((key) => {
        switch (key) {
          case '=':
            configDispatch(increaseOctave())
            break
          case '-':
            configDispatch(decreaseOctave())
            break
        }
      })

    return () => {
      notePlaySub.unsubscribe()
      waveControlSub.unsubscribe()
      octaveControlSub.unsubscribe()
    }
  }, [configState])
  return (
    <div id="app">
      <div className="window window--wave">
        <h2 className="window__header">Wave</h2>
        <div className="window__body">
          <WaveSection analyser={analyser}></WaveSection>
        </div>
      </div>
      <div className="window window--note">
        <h2 className="window__header">Note</h2>
        <div className="window__body">
          <NoteSection></NoteSection>
        </div>
      </div>
      <div className="window window--piano">
        <h2 className="window__header">Piano</h2>
        <div className="window__body">
          <PianoSection pianoState={pianoState.keyPressMap}></PianoSection>
        </div>
      </div>
    </div>
  )
}

export default App
