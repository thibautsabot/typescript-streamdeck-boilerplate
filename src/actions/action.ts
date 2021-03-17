import {
  DidReceiveSettingsEvent,
  KeyDownEvent,
  SDOnActionEvent,
  StreamDeckAction,
  WillAppearEvent,
} from 'streamdeck-typescript'

import { Boilerplate } from '../boilerplate-plugin'

interface SettingsInterface {
  count: number
  steps: number
}

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
  public onKeyUp() {
    console.log('keyUp')
    return 42
  }

  @SDOnActionEvent('keyDown')
  private onKeyDown({ context, payload: { settings } }: KeyDownEvent<SettingsInterface>) {
    console.log('keyDown')
  }

  @SDOnActionEvent('didReceiveSettings')
  private onSettings({
    context,
    payload: { settings },
  }: DidReceiveSettingsEvent<SettingsInterface>) {
    this.plugin.setTitle(settings.count.toString() ?? '', context)
  }
}
