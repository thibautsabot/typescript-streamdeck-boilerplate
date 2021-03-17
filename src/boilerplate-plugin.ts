import { DidReceiveSettingsEvent, SDOnActionEvent, StreamDeckPluginHandler } from 'streamdeck-typescript'

import { BoilerplateAction } from './actions/action'
import { SettingsInterface } from './boilerplate-property-inspector'

export class Boilerplate extends StreamDeckPluginHandler {
  constructor() {
    super()
    new BoilerplateAction(this, 'com.thibautsabot.streamdeck.boilerplate')
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
