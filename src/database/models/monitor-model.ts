import { Model } from '@nozbe/watermelondb'
import { date, field, readonly } from '@nozbe/watermelondb/decorators'

export class MonitorModel extends Model {
  static table = 'monitors'

  @field('name') name!: string
  @field('wifi_ssid') wifiSSID!: string | null
  @field('wifi_password') wifiPassword!: string | null
  @field('synced') synced!: boolean

  @readonly @date('created_at') createdAt!: number
  @readonly @date('updated_at') updatedAt!: number
}
