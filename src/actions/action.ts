import {
  KeyUpEvent,
  SDOnActionEvent,
  StreamDeckAction,
  WillAppearEvent,
} from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'
import { SettingsInterface } from '../boilerplate-property-inspector'

export class BoilerplateAction extends StreamDeckAction<Boilerplate, BoilerplateAction> {
  constructor(private plugin: Boilerplate, private actionName: string) {
    super(plugin, actionName)
    console.log('Boilerplate constructor')
  }

  @SDOnActionEvent('willAppear')
  private onAppear({ context, payload: { settings } }: WillAppearEvent<SettingsInterface>) {
    console.log('onAppear')
  }

  @SDOnActionEvent('keyUp')
  public onKeyUp({ action, context, device }: KeyUpEvent<SettingsInterface>): number {
    console.log('keyUp')
    console.log('action : ', action)
    console.log('context : ', context)
    console.log('device : ', device)

    return 42
  }
}
