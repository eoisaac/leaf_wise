import { z } from 'zod'

const zNewActuator = z.object({
  name: z.string(),
  monitorId: z.string(),
})
type NewActuatorSchema = z.infer<typeof zNewActuator>

export { NewActuatorSchema, zNewActuator }
