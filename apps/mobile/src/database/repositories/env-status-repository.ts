import { EnvStatusModel } from '@/database/models/env-status-model'
import { NewEnvStatusSchema } from '@/database/schemas/env-status-schema'
import { watermelonDB } from '@/database/watermelon'

const TABLE_NAME = 'env_statuses'

const create = async (status: NewEnvStatusSchema): Promise<EnvStatusModel> => {
  return await watermelonDB.write(async () => {
    return await watermelonDB.get<EnvStatusModel>(TABLE_NAME).create((data) => {
      data.humidity = status.humidity
      data.soilMoisture = status.soilMoisture
      data.light = status.light
      data.monitorId = status.monitorId
    })
  })
}

export const envStatusRepository = {
  create,
}
