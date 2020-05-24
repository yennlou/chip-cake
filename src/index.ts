import { h, render } from 'preact'
import App from './App'

render(h(App, null), document.querySelector('#root') as Element)
