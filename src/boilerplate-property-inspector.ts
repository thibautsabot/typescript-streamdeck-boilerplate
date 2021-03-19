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

  private async onValidateButtonPressed() {
    const input = (<HTMLInputElement>document.getElementById('input'))?.value

    console.log('new input value : ', input)
    console.log('old input value : ', this.requestSettings())

    this.setSettings(input)
  }
}

new BoilerplatePi()
