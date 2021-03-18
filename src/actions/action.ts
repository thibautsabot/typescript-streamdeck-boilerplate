import {
  DidReceiveSettingsEvent,
  KeyUpEvent,
  SDOnActionEvent,
  StreamDeckAction,
} from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'
import { SettingsInterface } from '../boilerplate-property-inspector'
import { isGlobalSettingsSet } from '../utils/index'

export class BoilerplateAction extends StreamDeckAction<Boilerplate, BoilerplateAction> {
  constructor(private plugin: Boilerplate, private actionName: string) {
    super(plugin, actionName)
  }

  @SDOnActionEvent('keyUp')
  public async onKeyUp({ action, context }: KeyUpEvent<SettingsInterface>): Promise<void> {
    console.log('action : ', action)
    console.log('context : ', context)

    const globalSettings = this.plugin.settingsManager.getGlobalSettings<SettingsInterface>()

    if (isGlobalSettingsSet(globalSettings)) {
      const token = globalSettings.accessToken

      await
      (
         // @ts-ignore
        await fetch(`https://api.smartthings.com/v1/scenes/${this.sceneId}/execute`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    }
  }

  @SDOnActionEvent('didReceiveSettings')
  private onReceiveSettings({ payload: { settings } }: DidReceiveSettingsEvent<any>) {
    // @ts-ignore
    this.sceneId = settings.scene
  }
}
