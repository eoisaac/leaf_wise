import { z } from 'zod'

const zPreferences = z.object({
  mqttHost: z.string(),
})
type PreferencesSchema = z.infer<typeof zPreferences>

export { PreferencesSchema, zPreferences }
