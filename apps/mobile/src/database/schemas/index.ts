import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schemas = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'monitors',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'wifi_ssid', type: 'string', isOptional: true },
        { name: 'wifi_password', type: 'string', isOptional: true },
        { name: 'is_synced', type: 'boolean', isOptional: true },
        { name: 'is_selected', type: 'boolean', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'actuators',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'is_active', type: 'boolean', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'monitor_id', type: 'string', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'env_statuses',
      columns: [
        { name: 'temperature', type: 'number' },
        { name: 'humidity', type: 'number' },
        { name: 'soil_moisture', type: 'number' },
        { name: 'light', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'monitor_id', type: 'string', isIndexed: true },
      ],
    }),
  ],
})
