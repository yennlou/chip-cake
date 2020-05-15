import configReducer from './config'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  config: configReducer
})

const store = createStore(rootReducer)

export default store
