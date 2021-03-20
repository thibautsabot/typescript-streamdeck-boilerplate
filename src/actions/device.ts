import {
  KeyUpEvent,
  SDOnActionEvent,
  StreamDeckAction,
} from 'streamdeck-typescript'

import { GlobalSettingsInterface } from '../utils/interface'
import { Smartthings } from '../boilerplate-plugin'
import { isGlobalSettingsSet } from '../utils/index'

export class DeviceAtion extends StreamDeckAction<Smartthings, DeviceAtion> {
  constructor(private plugin: Smartthings, private actionName: string) {
    super(plugin, actionName)
    console.log('Boilerplate constructor')
  }

  @SDOnActionEvent('keyUp')
  public async onKeyUp({
    action,
    context,
    device,
  }: KeyUpEvent<any>): Promise<number> {
    console.log('keyUp')
    console.log('action : ', action)
    console.log('context : ', context)
    console.log('device : ', device)

    const globalSettings = this.plugin.settingsManager.getGlobalSettings<GlobalSettingsInterface>()

    if (isGlobalSettingsSet(globalSettings)) {
      const token = globalSettings.accessToken

      const lightStatus = await (
        await fetch('https://api.smartthings.com/v1/devices/b473d73f-f66c-4b21-a3df-4f9fce0faf9b/status', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()

      const isOn = lightStatus.components.main.switch.switch.value === 'on'
      console.log('isOn : ', isOn)

      const res = await (
        await fetch('https://api.smartthings.com/v1/devices/b473d73f-f66c-4b21-a3df-4f9fce0faf9b/commands', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([{
            "capability": "switch",
            "command": isOn ? 'off' : 'on'
          }])
        })
      ).json()

      console.log('res : ', res)
    }

    return 42
  }
}
