import {
  KeyUpEvent,
  SDOnActionEvent,
  StreamDeckAction,
} from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'
import { SettingsInterface } from '../boilerplate-property-inspector'
import { isGlobalSettingsSet } from '../utils/index'

export class Toggle extends StreamDeckAction<Boilerplate, Toggle> {
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
