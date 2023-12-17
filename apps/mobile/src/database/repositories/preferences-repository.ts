import { PreferencesSchema } from '@/database/schemas/preferences-schema'
import { watermelonDB } from '@/database/watermelon'
import { version } from '../../../package.json'

const STORAGE_KEY = `leaf_wise@v${version}::preferences`

const set = async (preferences: PreferencesSchema): Promise<void> => {
  await watermelonDB.localStorage.set(STORAGE_KEY, JSON.stringify(preferences))
}

type Stored = string | undefined

const get = async (): Promise<PreferencesSchema | null> => {
  const stored = (await watermelonDB.localStorage.get(STORAGE_KEY)) as Stored
  return stored ? JSON.parse(stored) : null
}

export const preferencesRepository = {
  set,
  get,
}
