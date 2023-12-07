import { MonitorModel } from '@/database/models/monitor-model'
import { watermelonDB } from '@/database/watermelon'

const TABLE_NAME = 'monitors'

const create = async (monitor: MonitorModel): Promise<MonitorModel> => {
  return await watermelonDB.write(async () => {
    return await watermelonDB.get<MonitorModel>(TABLE_NAME).create((data) => {
      data.name = monitor.name
      data.wifiSSID = monitor.wifiSSID
      data.wifiPassword = monitor.wifiPassword
      data.synced = monitor.synced
    })
  })
}

const update = async (monitor: MonitorModel): Promise<MonitorModel> => {
  return await watermelonDB.write(async () => {
    return await monitor.update((data) => {
      data.name = monitor.name
      data.wifiSSID = monitor.wifiSSID
      data.wifiPassword = monitor.wifiPassword
      data.synced = monitor.synced
    })
  })
}

const destroy = async (monitor: MonitorModel) => {
  return await watermelonDB.write(async () => {
    return await monitor.destroyPermanently()
  })
}

const observeAll = async () => {
  return watermelonDB.get<MonitorModel>(TABLE_NAME).query().observe()
}

export const monitorRepository = {
  create,
  update,
  destroy,
  observeAll,
}
