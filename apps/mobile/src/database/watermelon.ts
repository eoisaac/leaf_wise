import { ActuatorModel } from '@/database/models/actuator-model'
import { MonitorModel } from '@/database/models/monitor-model'
import { schemas } from '@/database/schemas'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { setGenerator } from '@nozbe/watermelondb/utils/common/randomId'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { EnvStatusModel } from './models/env-status-model'

export const adapter = new SQLiteAdapter({
  schema: schemas,
})

export const watermelonDB = new Database({
  adapter,
  modelClasses: [MonitorModel, ActuatorModel, EnvStatusModel],
})

setGenerator(() => uuidv4())
