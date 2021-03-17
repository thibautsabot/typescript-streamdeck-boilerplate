import { DidReceiveSettingsEvent, SDOnActionEvent, StreamDeckPluginHandler } from 'streamdeck-typescript'

import { BoilerplateAction } from './actions/action'
import { SecondAction } from './actions/secondaction'
import { SettingsInterface } from './boilerplate-property-inspector'
import { Toggle } from './actions/toggle'

export class Boilerplate extends StreamDeckPluginHandler {
  constructor() {
    super()
    new BoilerplateAction(this, 'com.thibautsabot.streamdeck.boilerplate')
    new SecondAction(this, 'com.thibautsabot.streamdeck.secondaction')
    new Toggle(this, 'com.thibautsabot.streamdeck.toggle')
  }

  @SDOnActionEvent('didReceiveGlobalSettings')
  private onReceiveGlobalSettings({
    context,
    payload: { settings },
  }: DidReceiveSettingsEvent<SettingsInterface>) {
    console.log('Received global :', settings)
  }
}

new Boilerplate()
