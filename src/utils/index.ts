import { SettingsInterface } from '../boilerplate-property-inspector'

export function isGlobalSettingsSet(
  settings: SettingsInterface | unknown
): settings is SettingsInterface {
  return (settings as SettingsInterface).accessToken !== undefined
}

interface FetchAPI {
  body?: any
  endpoint: string
  method: string
  accessToken: string
}

export async function fetchApi({ body, endpoint, method, accessToken }: FetchAPI): Promise<any> {
  return await (
    await fetch(`https://api.smartthings.com/v1${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    })
  ).json()
}
