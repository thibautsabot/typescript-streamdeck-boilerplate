import { SettingsInterface } from '../boilerplate-property-inspector'

export function isGlobalSettingsSet(settings: SettingsInterface | unknown): settings is SettingsInterface {
  return (settings as SettingsInterface).accessToken !== undefined;
}