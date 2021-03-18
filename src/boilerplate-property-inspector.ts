import {
  SDOnPiEvent,
  StreamDeckPropertyInspectorHandler,
} from 'streamdeck-typescript'
import { isGlobalSettingsSet, fetchApi } from './utils/index'

export interface SettingsInterface {
  accessToken: string
}
class BoilerplatePi extends StreamDeckPropertyInspectorHandler {
  constructor() {
    super()
  }

  @SDOnPiEvent('documentLoaded')
  onDocumentLoaded(): void {
    document
      .getElementById('validate_button')
      ?.addEventListener('click', this.onValidateButtonPressed.bind(this))
    document
      .getElementById('scenes_select')
      ?.addEventListener('change', this.onSceneChanged.bind(this))
  }

  private async onValidateButtonPressed() {
    const accessToken = (<HTMLInputElement>document.getElementById('accesstoken'))?.value
    this.settingsManager.setGlobalSettings<SettingsInterface>({ accessToken })

    const res = await fetchApi({ endpoint: '/scenes', method: 'GET', accessToken })
    const scenes = res.items.map((item: any) => ({
      id: item.sceneId,
      name: item.sceneName,
    }))

    const select = <HTMLSelectElement>document.getElementById('scenes_select')

    scenes.forEach((scene: any) => {
      const option = document.createElement('option')
      option.value = scene.id
      option.text = scene.name
      select.add(option)
    })
  }

  public onSceneChanged(e: Event) {
    const newScene = (e.target as HTMLSelectElement).value 
    const oldScene = this.requestSettings() as any

    if (newScene !== oldScene) {
      this.setSettings({ scene: newScene })
    }
  }

  @SDOnPiEvent('globalSettingsAvailable')
  propertyInspectorDidAppear(): void {
    const globalSettings = this.settingsManager.getGlobalSettings<SettingsInterface>()

    if (isGlobalSettingsSet(globalSettings)) {
      const accessToken = globalSettings.accessToken
      if (accessToken) {
        ;(<HTMLInputElement>document.getElementById('accesstoken')).value = accessToken
      }
    }
  }
}

new BoilerplatePi()
