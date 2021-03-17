import {
  DidReceiveSettingsEvent,
  SDOnPiEvent,
  StreamDeckPropertyInspectorHandler,
} from 'streamdeck-typescript'

interface SettingsInterface {
  count: number
  steps: number
}
class BoilerplatePi extends StreamDeckPropertyInspectorHandler {
  constructor() {
    super()
  }

  @SDOnPiEvent('documentLoaded')
  onDocumentLoaded(): void {
    console.log('onDocumentLoaded')
  }

  @SDOnPiEvent('didReceiveSettings')
  private onSettingsReceived({
    payload: { settings },
  }: DidReceiveSettingsEvent<SettingsInterface>): void {
    console.log('didReceiveSettings')
  }
}

new BoilerplatePi()
