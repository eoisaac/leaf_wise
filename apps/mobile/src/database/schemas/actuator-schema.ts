import { z } from 'zod'

const zNewActuator = z.object({
  name: z.string(),
  monitorId: z.string(),
  isActive: z.boolean().optional().default(false),
})
type NewActuatorSchema = z.infer<typeof zNewActuator>

export { NewActuatorSchema, zNewActuator }
