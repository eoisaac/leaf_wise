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
        { name: 'synced', type: 'boolean', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'actuators',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'monitor_id', type: 'string', isIndexed: true },
      ],
    }),
  ],
})
