import { h } from 'preact'
import { useEffect } from 'preact/compat'
import { fromEvent } from 'rxjs'
import { pluck } from 'rxjs/operators'
import { playTone, stopTone } from './piano'

const App = () => {
  useEffect(() => {
    const key$ = fromEvent(document, 'keydown').pipe(pluck('key'))
    const subscription = key$.subscribe((key) => {
      const osc = playTone()
      setTimeout(() => {
        stopTone(osc)
      }, 500)
    })
    return () => subscription.unsubscribe()
  }, [])
  return <div>Hello Preact</div>
}

export default App
