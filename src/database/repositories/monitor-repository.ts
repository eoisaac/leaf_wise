import { MonitorModel } from '@/database/models/monitor-model'
import {
  NewMonitorSchema,
  UpdateMonitorSchema,
} from '@/database/schemas/monitor-schema'
import { watermelonDB } from '@/database/watermelon'
import { Observable } from '@nozbe/watermelondb/utils/rx'

const TABLE_NAME = 'monitors'

const create = async (monitor: NewMonitorSchema): Promise<MonitorModel> => {
  return await watermelonDB.write(async () => {
    return await watermelonDB.get<MonitorModel>(TABLE_NAME).create((data) => {
      data.name = monitor.name
      data.wifiSSID = monitor.wifiSSID
      data.wifiPassword = monitor.wifiPassword
      data.synced =
        typeof monitor.synced === 'undefined' ? false : monitor.synced
    })
  })
}

const update = async (
  monitorId: string,
  monitor: UpdateMonitorSchema,
): Promise<MonitorModel> => {
  return await watermelonDB.write(async () => {
    const stored = await watermelonDB
      .get<MonitorModel>(TABLE_NAME)
      .find(monitorId)

    return await stored.update((data) => {
      data.name = monitor.name
      data.wifiSSID = monitor.wifiSSID
      data.wifiPassword = monitor.wifiPassword
      data.synced =
        typeof monitor.synced === 'undefined' ? false : monitor.synced
    })
  })
}

const destroy = async (monitor: MonitorModel): Promise<void> => {
  return await watermelonDB.write(async () => {
    return await monitor.destroyPermanently()
  })
}

const observeAll = (): Observable<MonitorModel[]> => {
  return watermelonDB.get<MonitorModel>(TABLE_NAME).query().observe()
}

export const monitorRepository = {
  create,
  update,
  destroy,
  observeAll,
}
