import { z } from 'zod'

const zNewEnvStatus = z.object({
  temperature: z.number(),
  humidity: z.number(),
  soilMoisture: z.number(),
  light: z.number(),
  monitorId: z.string(),
})
type NewEnvStatusSchema = z.infer<typeof zNewEnvStatus>

export { NewEnvStatusSchema, zNewEnvStatus }
