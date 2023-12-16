// import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { ConfirmSheet } from '@/components/confirm-sheet'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { ActuatorModel } from '@/database/models/actuator-model'
import { useMQTT } from '@/hooks/use-mqtt'
import { mergeTailwind } from '@/utils/tailwind'
import { withObservables } from '@nozbe/watermelondb/react'
import { Gear, Power } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { neutral } from 'tailwindcss/colors'

interface ActuatorCardProps {
  actuator: ActuatorModel
  isLast?: boolean
}

const enhance = withObservables(['actuator'], ({ actuator }) => ({
  actuator: actuator.observe(),
}))

export const ActuatorCard = enhance(
  ({ actuator, isLast }: ActuatorCardProps) => {
    const { ref: confirmSheetRef, open: openConfirmSheet } = useBottomSheet()
    const handleDisplayConfirmSheet = () => openConfirmSheet()

    const mqtt = useMQTT()

    const handleToggle = () => {
      const newState = !actuator.isActive
      mqtt.publish(actuator.id, newState ? 'on' : 'off')
      actuator.setActive(newState)
    }

    return (
      <View
        className={mergeTailwind(
          `mb-2 mt-2 flex-row items-center justify-between rounded-3xl
      border-2 border-transparent bg-neutral-100 p-4 dark:bg-neutral-900`,
          { 'mb-8': isLast },
        )}
        style={{ elevation: 1 }}
      >
        <View>
          <Text className="mb-1 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {actuator.name}
          </Text>
          <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Last activation 1 day ago
          </Text>
        </View>

        <View className="flex-row gap-2">
          <Button variant="ghost2" size="icon" icon={<Gear weight="bold" />} />
          <Button
            variant={actuator.isActive ? 'danger' : 'primary'}
            size="icon"
            icon={<Power weight="bold" color={neutral[100]} />}
            onPress={handleDisplayConfirmSheet}
          />
        </View>

        <ConfirmSheet
          title={`${actuator.isActive ? 'Deactivate' : 'Activate'} ${
            actuator.name
          }?`}
          description={`Are you sure you want to ${
            actuator.isActive ? 'deactivate' : 'activate'
          } this actuator?`}
          confirmLabel={actuator.isActive ? 'Deactivate' : 'Activate'}
          ref={confirmSheetRef}
          onConfirm={handleToggle}
          closeOnAction
        />
      </View>
    )
  },
)
