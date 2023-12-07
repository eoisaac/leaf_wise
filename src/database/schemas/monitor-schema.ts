import { z } from 'zod'

const zNewMonitor = z.object({
  name: z.string(),
  wifiSSID: z.string().default(''),
  wifiPassword: z.string().default(''),
  isSynced: z.boolean().default(false).optional(),
  isSelected: z.boolean().default(false).optional(),
})
type NewMonitorSchema = z.infer<typeof zNewMonitor>

const zUpdateMonitor = z.object({
  name: z.string(),
  wifiSSID: z.string().default(''),
  wifiPassword: z.string().default(''),
  isSynced: z.boolean().default(false).optional(),
  isSelected: z.boolean().default(false).optional(),
})
type UpdateMonitorSchema = z.infer<typeof zUpdateMonitor>

export { NewMonitorSchema, UpdateMonitorSchema, zNewMonitor, zUpdateMonitor }
