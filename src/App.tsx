import { h } from 'preact'
import { useEffect, useReducer, useState } from 'preact/compat'
import { fromEvent } from 'rxjs'
import { pluck, filter, tap, share } from 'rxjs/operators'

import configReducer, {
  configInitState,
  selectWave,
  increaseOctave,
  decreaseOctave
} from './reducers/config'
import { keyList, Key } from './keys'
import { instruments, key2freq } from './audio'

import ConfigSection from './components/ConfigSection'
import PianoSection from './components/PianoSection'

import './styles/main.scss'

const App = () => {
  const [pianoState, pianoStateSet] = useState(
    keyList.reduce((acc, key) => ({ ...acc, [key]: false }), {}) as {
      [key in Key]: boolean
    }
  )
  const [configState, configDispatch] = useReducer(
    configReducer,
    configInitState
  )

  const { keyWaveMap, octaveLevel, waveForm } = configState

  useEffect(() => {
    const key$ = fromEvent(document, 'keydown').pipe(
      pluck<Event, string>('key'),
      // tap(console.log),
      share()
    )

    const notePlaySub = key$
      .pipe(filter((key: string) => keyList.includes(key)))
      .subscribe((key: any) => {
        const osc = instruments[waveForm].play(key2freq(key, octaveLevel))
        pianoStateSet({ ...pianoState, [key]: true })
        setTimeout(() => {
          pianoStateSet({ ...pianoState, [key]: false })
          osc.stop()
        }, 200)
      })

    const waveControlSub = key$
      .pipe(filter((key: string) => Object.keys(keyWaveMap).includes(key)))
      .subscribe((key: any) => {
        configDispatch(selectWave(keyWaveMap[key]))
      })

    const octaveControlSub = key$
      .pipe(filter((key: string) => ['=', '-'].includes(key)))
      .subscribe((key: any) => {
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
          <div className="window__body"></div>
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
            <PianoSection pianoState={pianoState}></PianoSection>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
