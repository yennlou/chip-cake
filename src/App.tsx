import { h } from 'preact'
import { useEffect, useReducer } from 'preact/compat'
import { fromEvent } from 'rxjs'
import { pluck, filter, tap } from 'rxjs/operators'

import configReducer, { configInitState, selectWave } from './reducers/config'
import { playTone, stopTone, getKeyList, key2freq } from './piano'
import ConfigSection from './components/ConfigSection'
import './styles/main.scss'

const App = () => {
  const [configState, configDispatch] = useReducer(
    configReducer,
    configInitState
  )

  const { keyWaveMap } = configState

  useEffect(() => {
    const key$ = fromEvent(document, 'keydown').pipe(
      pluck<Event, string>('key')
    )
    const notePlaySub = key$
      .pipe(
        // tap(console.log),
        filter((key: string) => getKeyList().includes(key))
      )
      .subscribe((key: any) => {
        const osc = playTone(key2freq(key), configState.waveForm)
        setTimeout(() => {
          stopTone(osc)
        }, 200)
      })
    const controlSub = key$
      .pipe(filter((key: string) => Object.keys(keyWaveMap).includes(key)))
      .subscribe((key: any) => {
        configDispatch(selectWave(keyWaveMap[key]))
      })
    return () => {
      notePlaySub.unsubscribe()
      controlSub.unsubscribe()
    }
  }, [configState])
  return (
    <div id="root">
      <div id="app">
        <ConfigSection
          config={configState}
          dispatch={configDispatch}
        ></ConfigSection>
      </div>
    </div>
  )
}

export default App
