import { h } from 'preact'
import { useEffect } from 'preact/compat'
import { fromEvent } from 'rxjs'
import { pluck, filter } from 'rxjs/operators'
import { playTone, stopTone, getKeyList, key2freq } from './piano'

import './styles.scss'

const App = () => {
  useEffect(() => {
    const key$ = fromEvent(document, 'keydown').pipe(
      pluck<Event, string>('key'),
      filter((key: string) => getKeyList().includes(key))
    )
    const subscription = key$.subscribe((key: any) => {
      const osc = playTone(key2freq(key))
      setTimeout(() => {
        stopTone(osc)
      }, 200)
    })
    return () => subscription.unsubscribe()
  }, [])
  return (
    <div id="root">
      <div id="app">Hello Preact</div>
    </div>
  )
}
export default App
