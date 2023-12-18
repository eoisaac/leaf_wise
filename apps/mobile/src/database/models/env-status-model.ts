import { MonitorModel } from '@/database/models/monitor-model'
import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { date, field, readonly, relation } from '@nozbe/watermelondb/decorators'

export class EnvStatusModel extends Model {
  static table = 'env_statuses'
  static associations: Associations = {
    monitors: { type: 'belongs_to', key: 'monitor_id' },
  }

  @field('temperature') temperature!: number
  @field('humidity') humidity!: number
  @field('soil_moisture') soilMoisture!: number
  @field('light') light!: number

  @readonly @date('created_at') createdAt!: number
  @readonly @date('updated_at') updatedAt!: number

  @field('monitor_id') monitorId!: string
  @relation('monitors', 'monitor_id') monitor!: MonitorModel
}
