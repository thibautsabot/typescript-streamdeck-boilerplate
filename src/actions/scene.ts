import { GlobalSettingsInterface, SceneSettingsInterface } from '../utils/interface'
import { KeyUpEvent, SDOnActionEvent, StreamDeckAction } from 'streamdeck-typescript'

import { Smartthings } from '../boilerplate-plugin'
import { isGlobalSettingsSet } from '../utils/index'

export class SceneAction extends StreamDeckAction<Smartthings, SceneAction> {
  constructor(private plugin: Smartthings, private actionName: string) {
    super(plugin, actionName)
  }

  @SDOnActionEvent('keyUp')
  public async onKeyUp({ payload }: KeyUpEvent<SceneSettingsInterface>): Promise<void> {
    const globalSettings = this.plugin.settingsManager.getGlobalSettings<GlobalSettingsInterface>()

    if (isGlobalSettingsSet(globalSettings)) {
      const token = globalSettings.accessToken

      await (
        await fetch(`https://api.smartthings.com/v1/scenes/${payload.settings.sceneId}/execute`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    }
  }
}
