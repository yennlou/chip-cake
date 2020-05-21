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

import ConfigSection from './components/ConfigSection'
import PianoSection from './components/PianoSection'
import StatusSection from './components/StatusSection'

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
    <div id="root">
      <div id="app">
        <div className="window window--status">
          <h2 className="window__header">Status</h2>
          <div className="window__body">
            <StatusSection analyser={analyser}></StatusSection>
          </div>
        </div>
        <div className="window window--control">
          <h2 className="window__header">Control</h2>
          <div className="window__body">
            <ConfigSection
              config={configState}
              dispatch={configDispatch}
            ></ConfigSection>
          </div>
        </div>
        <div className="window window--piano">
          <h2 className="window__header">Piano</h2>
          <div className="window__body">
            <PianoSection pianoState={pianoState.keyPressMap}></PianoSection>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
