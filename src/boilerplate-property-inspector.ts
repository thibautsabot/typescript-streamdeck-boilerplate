import { SDOnPiEvent, StreamDeckPropertyInspectorHandler } from 'streamdeck-typescript'
class BoilerplatePi extends StreamDeckPropertyInspectorHandler {
  constructor() {
    super()
  }

  @SDOnPiEvent('documentLoaded')
  onDocumentLoaded(): void {
    document
      .getElementById('validate_button')
      ?.addEventListener('click', this.onValidateButtonPressed.bind(this))
  }

  private onValidateButtonPressed() {
    const input = (<HTMLInputElement>document.getElementById('input'))?.value

    this.setSettings({ input })
  }
}

new BoilerplatePi()
