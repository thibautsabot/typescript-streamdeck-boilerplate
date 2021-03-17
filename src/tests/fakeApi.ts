import {
  PossibleEventsToSend,
  StreamDeckPluginHandler,
} from 'streamdeck-typescript'
import { StateType, TargetType } from 'streamdeck-typescript/dist/src/interfaces/enums'

export default class FakeApi extends StreamDeckPluginHandler {
  state: StateType
  title: string
  alert = 0
  okay = 0

  constructor() {
    super()
  }

  setState(state: StateType) {
    this.state = state
  }

  showAlert() {
    this.alert++
  }

  showOk() {
    this.okay++
  }

  setTitle(title: string) {
    this.title = title
  }

  setImage(image: string, context: string, target?: TargetType, state?: StateType) {}

  switchToProfile(profile: string, device?: string) {}

  sendToPropertyInspector(payload: any, action: string, context: string) {}

  protected registerPi(actionInfo: string) {}

  protected onOpen() {}

  protected onClose() {}

  protected onReady() {}

  setSettings<Settings = any>(settings: Settings, context: string) {}

  requestSettings(context: string) {}

  setGlobalSettings<GlobalSettings = any>(settings: GlobalSettings) {}

  requestGlobalSettings() {}

  openUrl(url: string) {}

  logMessage(message: string) {}

  send(event: PossibleEventsToSend, data: any) {}

  enableDebug() {}

  addEventListener(event: string, fnc: Function) {}
}