import { EnvStatusModel } from '@/database/models/env-status-model'
import { NewEnvStatusSchema } from '@/database/schemas/env-status-schema'
import { watermelonDB } from '@/database/watermelon'
import { Q } from '@nozbe/watermelondb'
import { Observable } from '@nozbe/watermelondb/utils/rx'

const TABLE_NAME = 'env_statuses'

const create = async (status: NewEnvStatusSchema): Promise<EnvStatusModel> => {
  return await watermelonDB.write(async () => {
    return await watermelonDB.get<EnvStatusModel>(TABLE_NAME).create((data) => {
      data.humidity = status.humidity
      data.temperature = status.temperature
      data.soilMoisture = status.soilMoisture
      data.light = status.light
      data.monitorId = status.monitorId
    })
  })
}

const flush = async (monitorId: string): Promise<void> => {
  return await watermelonDB.write(async () => {
    return await watermelonDB
      .get<EnvStatusModel>(TABLE_NAME)
      .query(Q.where('monitor_id', monitorId))
      .destroyAllPermanently()
  })
}

const observeMonitorEnvStatuses = (
  monitorId: string,
): Observable<EnvStatusModel[]> => {
  return watermelonDB
    .get<EnvStatusModel>(TABLE_NAME)
    .query(Q.where('monitor_id', monitorId))
    .observeWithColumns(['monitor_id'])
}

export const envStatusRepository = {
  create,
  flush,
  observeMonitorEnvStatuses,
}
