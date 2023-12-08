import { ActuatorModel } from '@/database/models/actuator-model'
import { NewActuatorSchema } from '@/database/schemas/actuator-schema'
import { watermelonDB } from '@/database/watermelon'

const TABLE_NAME = 'actuators'

const create = async (actuator: NewActuatorSchema): Promise<ActuatorModel> => {
  return await watermelonDB.write(async () => {
    return await watermelonDB.get<ActuatorModel>(TABLE_NAME).create((data) => {
      data.name = actuator.name
      data.monitorId = actuator.monitorId
    })
  })
}

export const actuatorRepository = {
  create,
}
