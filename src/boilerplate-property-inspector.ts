import { SDOnPiEvent, StreamDeckPropertyInspectorHandler } from 'streamdeck-typescript'

export interface SettingsInterface {
  accessToken: string
}
class BoilerplatePi extends StreamDeckPropertyInspectorHandler {
  constructor() {
    super()
  }

  @SDOnPiEvent('documentLoaded')
  onDocumentLoaded(): void {
    document.getElementById('accesstoken')?.addEventListener('change', this.onAccessTokenChange.bind(this))
  }

  private onAccessTokenChange(e: Event) {
    this.settingsManager.setGlobalSettings<SettingsInterface>({ accessToken: (<HTMLInputElement>e.target).value })
  }
}

new BoilerplatePi()
