import { DidReceiveSettingsEvent, KeyUpEvent, SDOnActionEvent, StreamDeckAction } from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'

interface SettingsInterface {
  input: string
}
class BoilerplateActionWithInput extends StreamDeckAction<Boilerplate, BoilerplateAction> {
  inputValue: {
    [key: number]: string
  }
}
export class BoilerplateAction extends BoilerplateActionWithInput {
  constructor(private plugin: Boilerplate, private actionName: string) {
    super(plugin, actionName)
  }

  @SDOnActionEvent('keyUp')
  public onKeyUp({ payload: { settings } }: KeyUpEvent<SettingsInterface>): void {
    console.log('keyUp : ', settings.input)
  }

  @SDOnActionEvent('didReceiveSettings')
  onReceiveSettings({ payload: { settings } }: DidReceiveSettingsEvent<SettingsInterface>): void {
    this.inputValue = settings.input
  }
}
