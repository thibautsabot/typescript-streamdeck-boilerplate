import {
  KeyUpEvent,
  SDOnActionEvent,
  StreamDeckAction,
} from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'
import { SettingsInterface } from '../boilerplate-property-inspector'

export class SecondAction extends StreamDeckAction<Boilerplate, SecondAction> {
  constructor(private plugin: Boilerplate, private actionName: string) {
    super(plugin, actionName)
    console.log('Boilerplate constructor')
  }

  @SDOnActionEvent('keyUp')
  public onKeyUp({ action, context, device }: KeyUpEvent<SettingsInterface>): number {
    console.log('SecondAction keyUp')

    return 42
  }
}
