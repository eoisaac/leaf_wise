import { ActuatorModel } from '@/database/models/actuator-model'
import { Model, Q } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import {
  children,
  date,
  field,
  readonly,
  writer,
} from '@nozbe/watermelondb/decorators'
import { EnvStatusModel } from './env-status-model'

export class MonitorModel extends Model {
  static table = 'monitors'
  static associations: Associations = {
    actuators: { type: 'has_many', foreignKey: 'monitor_id' },
  }

  @field('name') name!: string
  @field('wifi_ssid') wifiSSID!: string | null
  @field('wifi_password') wifiPassword!: string | null
  @field('is_synced') isSynced!: boolean
  @field('is_selected') isSelected!: boolean

  @readonly @date('created_at') createdAt!: number
  @readonly @date('updated_at') updatedAt!: number

  @children('actuators') actuators: ActuatorModel[]
  @children('env_statuses') envStatuses: EnvStatusModel[]

  @writer async setSelected(isSelected: boolean = true) {
    const stored = await this.database
      .get<MonitorModel>('monitors')
      .query(Q.where('is_selected', true))

    if (stored.length > 0) {
      await stored[0].update((data) => {
        data.isSelected = false
      })
    }

    await this.update((monitor) => {
      monitor.isSelected = isSelected
    })
  }

  @writer async setSynced(isSynced: boolean = true) {
    await this.update((monitor) => {
      monitor.isSynced = isSynced
    })
  }

  @writer async getActuators() {
    const actuators = await this.collections
      .get<ActuatorModel>('actuators')
      .query(Q.where('monitor_id', this.id))
      .fetch()

    return actuators ?? []
  }
}
