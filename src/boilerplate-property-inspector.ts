import { SDOnPiEvent, StreamDeckPropertyInspectorHandler } from 'streamdeck-typescript'
import { isGlobalSettingsSet, fetchApi, addSelectOption, SelectElement } from './utils/index'
import { GlobalSettingsInterface, SceneSettingsInterface, DeviceSettingsInterface } from './utils/interface'
import { PagedResult, SceneSummary, DeviceList } from '@smartthings/core-sdk'

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

    let elements: SelectElement[] = []

    switch (this.actionInfo.action) {
      case pluginName + '.scene': {
        const res = await fetchApi<PagedResult<SceneSummary>>({
          endpoint: '/scenes',
          method: 'GET',
          accessToken,
        })
        elements = res.items.map((item) => ({
          id: item.sceneId,
          name: item.sceneName,
        }))
        break
      }
      case pluginName + '.device': {
        const res = await fetchApi<DeviceList>({
          endpoint: '/devices',
          method: 'GET',
          accessToken,
        })
        elements = res.items.map((item) => ({
          id: item.deviceId,
          name: item.label,
        }))
        break
      }
    }

    elements.forEach((element) => addSelectOption({ select: this.select, element }))
  }

  public onSceneChanged(e: Event) {
    const newSelection = (e.target as HTMLSelectElement).value

    switch (this.actionInfo.action) {
      case pluginName + '.scene': {
        this.setSettings<SceneSettingsInterface>({ sceneId: newSelection })
        break
      }
      case pluginName + '.device': {
        this.setSettings<DeviceSettingsInterface>({ deviceId: newSelection })
        break
      }
    }
  }

  // Prefill PI elements from cache
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
