import {
  KeyUpEvent,
  SDOnActionEvent,
  StreamDeckAction,
} from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'
import { SettingsInterface } from '../boilerplate-property-inspector'
import { isGlobalSettingsSet } from '../utils/index'

export class SecondAction extends StreamDeckAction<Boilerplate, SecondAction> {
  constructor(private plugin: Boilerplate, private actionName: string) {
    super(plugin, actionName)
    console.log('Boilerplate constructor')
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
        await fetch('https://api.smartthings.com/v1/scenes/ffc0f6ec-45df-4d89-bea7-c0b1f70fe606/execute', {
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