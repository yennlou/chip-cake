import { h } from 'preact'
import { useEffect, useReducer } from 'preact/compat'
import { fromEvent } from 'rxjs'
import { pluck, filter } from 'rxjs/operators'
import configReducer, { configInitState } from './reducers/config'
import { playTone, stopTone, getKeyList, key2freq } from './piano'
import ConfigSection from './components/ConfigSection'
import './styles/main.scss'

const App = () => {
  const [configState, configDispatch] = useReducer(
    configReducer,
    configInitState
  )

  useEffect(() => {
    const key$ = fromEvent(document, 'keydown').pipe(
      pluck<Event, string>('key'),
      filter((key: string) => getKeyList().includes(key))
    )
    const subscription = key$.subscribe((key: any) => {
      const osc = playTone(key2freq(key), configState.waveForm)
      setTimeout(() => {
        stopTone(osc)
      }, 200)
    })
    return () => subscription.unsubscribe()
  }, [])
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
