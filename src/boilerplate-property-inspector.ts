import {
  DidReceiveSettingsEvent,
  SDOnPiEvent,
  StreamDeckPropertyInspectorHandler,
} from 'streamdeck-typescript'

interface SettingsInterface {
  count: number
  steps: number
}
class CounterPi extends StreamDeckPropertyInspectorHandler {
  constructor() {
    super()
  }

  @SDOnPiEvent('documentLoaded')
  onDocumentLoaded(): void {
    console.log('I AM READY')
  }

  @SDOnPiEvent('didReceiveSettings')
  private onSettingsReceived({
    payload: { settings },
  }: DidReceiveSettingsEvent<SettingsInterface>): void {
    console.log('I AM READY')
  }
}

new CounterPi()
