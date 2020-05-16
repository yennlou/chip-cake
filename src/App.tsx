import { h } from 'preact'
import { useEffect, useReducer } from 'preact/compat'
import { fromEvent } from 'rxjs'
import { pluck, filter, tap, share } from 'rxjs/operators'

import configReducer, {
  configInitState,
  selectWave,
  increaseOctave,
  decreaseOctave
} from './reducers/config'
import { playTone, stopTone, getKeyList, key2freq } from './piano'

import ConfigSection from './components/ConfigSection'
import PianoSection from './components/PianoSection'

import './styles/main.scss'

const App = () => {
  const [configState, configDispatch] = useReducer(
    configReducer,
    configInitState
  )

  const { keyWaveMap, octaveLevel } = configState

  useEffect(() => {
    const key$ = fromEvent(document, 'keydown').pipe(
      pluck<Event, string>('key'),
      // tap(console.log),
      share()
    )

    const notePlaySub = key$
      .pipe(filter((key: string) => getKeyList().includes(key)))
      .subscribe((key: any) => {
        const osc = playTone(key2freq(key, octaveLevel), configState.waveForm)
        setTimeout(() => {
          stopTone(osc)
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
        <ConfigSection
          config={configState}
          dispatch={configDispatch}
        ></ConfigSection>
        <PianoSection></PianoSection>
      </div>
    </div>
  )
}

export default App
