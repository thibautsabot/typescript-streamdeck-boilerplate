import { BoilerplateAction } from './actions/action'
import { SecondAction } from './actions/secondaction'
import { StreamDeckPluginHandler } from 'streamdeck-typescript'
import { Toggle } from './actions/toggle'

export class Boilerplate extends StreamDeckPluginHandler {
  constructor() {
    super()
    new BoilerplateAction(this, 'com.thibautsabot.streamdeck.boilerplate')
    new SecondAction(this, 'com.thibautsabot.streamdeck.secondaction')
    new Toggle(this, 'com.thibautsabot.streamdeck.toggle')
  }
}

new Boilerplate()
