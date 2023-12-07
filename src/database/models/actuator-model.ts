import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { date, field, readonly, relation } from '@nozbe/watermelondb/decorators'

export class ActuatorModel extends Model {
  static table = 'actuators'
  static associations: Associations = {
    monitors: { type: 'belongs_to', key: 'monitor_id' },
  }

  @field('name') name!: string

  @readonly @date('created_at') createdAt!: number
  @readonly @date('updated_at') updatedAt!: number

  @field('monitor_id') monitorId!: string
  @relation('monitors', 'monitor_id') monitor!: unknown
}
