import { SDOnPiEvent, StreamDeckPropertyInspectorHandler } from 'streamdeck-typescript'
import { isGlobalSettingsSet, fetchApi, addSelectOption } from './utils/index'
import { GlobalSettingsInterface, SceneSettingsInterface } from './utils/interface'
import { ListScene } from './utils/apiTypes'

const pluginName = 'com.thibautsabot.streamdeck'

class SmartthingsPI extends StreamDeckPropertyInspectorHandler {
  private validateButton: HTMLButtonElement
  private selectLabel: HTMLSelectElement
  private select: HTMLSelectElement

  constructor() {
    super()
  }

  @SDOnPiEvent('documentLoaded')
  onDocumentLoaded(): void {
    this.validateButton = document.getElementById('validate_button') as HTMLButtonElement
    this.selectLabel = document.getElementById('select_label') as HTMLSelectElement
    this.select = document.getElementById('select_value') as HTMLSelectElement
    
    this.validateButton?.addEventListener('click', this.onValidateButtonPressed.bind(this))
    this.select?.addEventListener('change', this.onSceneChanged.bind(this))

    switch (this.actionInfo.action) {
      case pluginName + '.device': {
        this.selectLabel.textContent = 'Devices'
        this.validateButton.textContent = 'Fetch devices list'
        addSelectOption({ select: this.select, element: { id: 'none', name: 'No device' } })
        break
      }
      case pluginName + '.scene': {
        console.log('I AM HERE')
        this.validateButton.textContent = 'Fetch scenes list'
        this.selectLabel.textContent = 'Scenes'
        addSelectOption({ select: this.select, element: { id: 'none', name: 'No scene' } })
        break
      }
    }
  }

  private async onValidateButtonPressed() {
    const accessToken = (<HTMLInputElement>document.getElementById('accesstoken'))?.value
    this.settingsManager.setGlobalSettings<GlobalSettingsInterface>({ accessToken })
    let elements: any = []

    switch (this.actionInfo.action) {
      case pluginName + '.scene': {
        const res = await fetchApi<ListScene>({ endpoint: '/scenes', method: 'GET', accessToken })
        elements = res.items.map((item) => ({
          id: item.sceneId,
          name: item.sceneName,
        }))
        break
      }
      case pluginName + '.device': {
        console.log('DEVICE')
        break
      }
    }

    elements.forEach((element: any) => addSelectOption({ select: this.select, element }))
  }

  public onSceneChanged(e: Event) {
    const newScene = (e.target as HTMLSelectElement).value

    this.setSettings<SceneSettingsInterface>({ sceneId: newScene })
  }

  @SDOnPiEvent('globalSettingsAvailable')
  propertyInspectorDidAppear(): void {
    const globalSettings = this.settingsManager.getGlobalSettings<GlobalSettingsInterface>()

    if (isGlobalSettingsSet(globalSettings)) {
      const accessToken = globalSettings.accessToken
      if (accessToken) {
        ;(<HTMLInputElement>document.getElementById('accesstoken')).value = accessToken
      }
    }
  }
}

new SmartthingsPI()
