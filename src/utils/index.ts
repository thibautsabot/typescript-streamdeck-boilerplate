import { GlobalSettingsInterface } from './interface'

export function isGlobalSettingsSet(
  settings: GlobalSettingsInterface | unknown
): settings is GlobalSettingsInterface {
  return (settings as GlobalSettingsInterface).accessToken !== undefined
}

interface FetchAPI {
  body?: BodyInit
  endpoint: string
  method: string
  accessToken: string
}

export async function fetchApi<T>({ body, endpoint, method, accessToken }: FetchAPI): Promise<T> {
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

interface AddSelectOption {
  select: HTMLSelectElement
  element: {
    id: string
    name: string
  }
}

export const addSelectOption = ({select, element}: AddSelectOption): void => {
  const option = document.createElement('option')
  option.value = element.id
  option.text = element.name
  select.add(option)
}