import { MonitorModel } from '@/database/models/monitor-model'
import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import {
  date,
  field,
  readonly,
  relation,
  writer,
} from '@nozbe/watermelondb/decorators'

export class ActuatorModel extends Model {
  static table = 'actuators'
  static associations: Associations = {
    monitors: { type: 'belongs_to', key: 'monitor_id' },
  }

  @field('name') name!: string
  @field('is_active') isActive!: boolean

  @readonly @date('created_at') createdAt!: number
  @readonly @date('updated_at') updatedAt!: number

  @field('monitor_id') monitorId!: string
  @relation('monitors', 'monitor_id') monitor!: MonitorModel

  @writer async setActive(isActive: boolean = true) {
    await this.update((actuator) => {
      actuator.isActive = isActive
    })
  }
}
