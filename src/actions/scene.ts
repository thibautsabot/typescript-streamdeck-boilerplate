import { GlobalSettingsInterface, SceneSettingsInterface } from '../utils/interface'
import { KeyUpEvent, SDOnActionEvent, StreamDeckAction } from 'streamdeck-typescript'
import { fetchApi, isGlobalSettingsSet } from '../utils/index'

import { ExecuteScene } from '../utils/apiTypes'
import { Smartthings } from '../boilerplate-plugin'

export class SceneAction extends StreamDeckAction<Smartthings, SceneAction> {
  constructor(private plugin: Smartthings, private actionName: string) {
    super(plugin, actionName)
  }

  @SDOnActionEvent('keyUp')
  public async onKeyUp({ payload }: KeyUpEvent<SceneSettingsInterface>): Promise<void> {
    const globalSettings = this.plugin.settingsManager.getGlobalSettings<GlobalSettingsInterface>()

    if (isGlobalSettingsSet(globalSettings)) {
      const token = globalSettings.accessToken
      await fetchApi<ExecuteScene>({
        endpoint: `/scenes/${payload.settings.sceneId}/execute`,
        accessToken: token,
        method: 'POST',
      })
    }
  }
}
