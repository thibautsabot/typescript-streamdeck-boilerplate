import {
  KeyUpEvent,
  SDOnActionEvent,
  StreamDeckAction,
  WillAppearEvent,
} from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'
import { SettingsInterface } from '../boilerplate-property-inspector'
import { isGlobalSettingsSet } from '../utils/index'

export class BoilerplateAction extends StreamDeckAction<Boilerplate, BoilerplateAction> {
  constructor(private plugin: Boilerplate, private actionName: string) {
    super(plugin, actionName)
    console.log('Boilerplate constructor')
  }

  @SDOnActionEvent('willAppear')
  private onAppear({ context, payload: { settings } }: WillAppearEvent<SettingsInterface>) {
    console.log('onAppear')
  }

  @SDOnActionEvent('keyUp')
  public async onKeyUp({
    action,
    context,
    device,
  }: KeyUpEvent<SettingsInterface>): Promise<number> {
    console.log('keyUp')
    console.log('action : ', action)
    console.log('context : ', context)
    console.log('device : ', device)

    const globalSettings = this.plugin.settingsManager.getGlobalSettings<SettingsInterface>()

    if (isGlobalSettingsSet(globalSettings)) {
      const token = globalSettings.accessToken

      console.log('token : ', token)

      const res = await (
        await fetch('https://api.smartthings.com/v1/scenes/909574ba-d2a8-4095-af1a-aad39284e3c3/execute', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()

      console.log('res : ', res)
    }

    return 42
  }
}
