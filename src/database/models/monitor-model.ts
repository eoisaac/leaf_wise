import { ActuatorModel } from '@/database/models/actuator-model'
import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { children, date, field, readonly } from '@nozbe/watermelondb/decorators'

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
}
