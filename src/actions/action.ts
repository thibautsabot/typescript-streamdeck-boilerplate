import { Boilerplate } from '../boilerplate-plugin'
import { StreamDeckAction } from 'streamdeck-typescript'

export class BoilerplateAction extends StreamDeckAction<Boilerplate, BoilerplateAction> {
  constructor(private plugin: Boilerplate, private actionName: string) {
    super(plugin, actionName)
  }
}
