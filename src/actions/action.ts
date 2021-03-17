import {
  DidReceiveSettingsEvent,
  KeyDownEvent,
  SDOnActionEvent,
  StreamDeckAction,
  WillAppearEvent,
} from 'streamdeck-typescript'

import { Counter } from '../boilerplate-plugin'

interface SettingsInterface {
  count: number
  steps: number
}

export class CounterAction extends StreamDeckAction<Counter, CounterAction> {
  constructor(private plugin: Counter, private actionName: string) {
    super(plugin, actionName)
    console.log('COUNTER constructo')
  }

  @SDOnActionEvent('willAppear')
  private onAppear({ context, payload: { settings } }: WillAppearEvent<SettingsInterface>) {
    // this.plugin.setTitle((settings.count ?? 0).toString(), context)
    console.log('willapear')
  }

  @SDOnActionEvent('keyUp')
  public onKeyUp() {
    console.log('KEYUP ok')
    return 42
  }

  @SDOnActionEvent('keyDown')
  private onKeyDown({ context, payload: { settings } }: KeyDownEvent<SettingsInterface>) {
    console.log('KEYDOWN')
  }

  @SDOnActionEvent('didReceiveSettings')
  private onSettings({
    context,
    payload: { settings },
  }: DidReceiveSettingsEvent<SettingsInterface>) {
    this.plugin.setTitle(settings.count.toString() ?? '', context)
  }
}
