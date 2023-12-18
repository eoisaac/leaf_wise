import { z } from 'zod'

const zNewEnvStatus = z.object({
  temperature: z.string(),
  humidity: z.string(),
  soilMoisture: z.string(),
  light: z.string(),
  monitorId: z.string(),
})
type NewEnvStatusSchema = z.infer<typeof zNewEnvStatus>

export { NewEnvStatusSchema, zNewEnvStatus }
