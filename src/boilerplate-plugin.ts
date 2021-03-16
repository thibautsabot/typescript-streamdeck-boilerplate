import {CounterAction} from './actions/action'
import {StreamDeckPluginHandler} from 'streamdeck-typescript'

export class Counter extends StreamDeckPluginHandler {
  constructor() {
    super()
    new CounterAction(this, 'com.thibautsabot.streamdeck.boilerplate')
  }
}

new Counter()
