// https://smartthings.developer.samsung.com/docs/api-ref/st-api.htm
export interface ListScene {
  items: {
    sceneId: string
    sceneName: string
    sceneIcon: string
    sceneColor: string
    locationId: string
    createdBy: string
    createdDate: Date
    lastUpdatedDate: Date
    lastExecutedDate: Date
    editable: boolean
    apiVersion: string
  }[]
}

export interface ExecuteScene {
  status: string
}