import { MonitorModel } from '@/database/models/monitor-model'
import {
  NewMonitorSchema,
  UpdateMonitorSchema,
} from '@/database/schemas/monitor-schema'
import { watermelonDB } from '@/database/watermelon'
import { Q } from '@nozbe/watermelondb'
import { Observable } from '@nozbe/watermelondb/utils/rx'

const TABLE_NAME = 'monitors'

const create = async (monitor: NewMonitorSchema): Promise<MonitorModel> => {
  return await watermelonDB.write(async () => {
    return await watermelonDB.get<MonitorModel>(TABLE_NAME).create((data) => {
      data.name = monitor.name
      data.wifiSSID = monitor.wifiSSID
      data.wifiPassword = monitor.wifiPassword
      data.isSynced = monitor.isSynced ?? false
      data.isSelected = monitor.isSelected ?? false
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
      data.isSynced = monitor.isSynced ?? false
      data.isSelected = monitor.isSelected ?? false
    })
  })
}

const destroy = async (monitor: MonitorModel): Promise<void> => {
  return await watermelonDB.write(async () => {
    return await monitor.destroyPermanently()
  })
}

const select = async (monitorId: string): Promise<MonitorModel | null> => {
  return await watermelonDB.write(async () => {
    const stored = await watermelonDB
      .get<MonitorModel>(TABLE_NAME)
      .query(Q.where('is_selected', true))

    if (stored.length > 0) {
      await stored[0].update((data) => {
        data.isSelected = false
      })
    }

    const newSelectedMonitor = await watermelonDB
      .get<MonitorModel>(TABLE_NAME)
      .find(monitorId)
    return await newSelectedMonitor.update((data) => {
      data.isSelected = true
    })
  })
}

const observeAll = (): Observable<MonitorModel[]> => {
  return watermelonDB.get<MonitorModel>(TABLE_NAME).query().observe()
}

export const monitorRepository = {
  create,
  update,
  destroy,
  select,
  observeAll,
}
