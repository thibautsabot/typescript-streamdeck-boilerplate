import { BoilerplateAction } from './actions/action'
import { StreamDeckPluginHandler } from 'streamdeck-typescript'

export class Boilerplate extends StreamDeckPluginHandler {
  constructor() {
    super()
    new BoilerplateAction(this, 'com.thibautsabot.streamdeck.boilerplate')
  }
}

new Boilerplate()
