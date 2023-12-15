// import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { ConfirmSheet } from '@/components/confirm-sheet'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { ActuatorModel } from '@/database/models/actuator-model'
import { useMQTT } from '@/hooks/use-mqtt'
import { mergeTailwind } from '@/utils/tailwind'
import { withObservables } from '@nozbe/watermelondb/react'
import { Coffee, Gear, Power } from 'phosphor-react-native'
import { Text, View } from 'react-native'

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

    const toggleOn = () => mqtt.publish(actuator.id, 'on')
    const toggleOff = () => mqtt.publish(actuator.id, 'off')

    return (
      <View
        className={mergeTailwind(
          `mb-2 mt-2 flex-row items-center justify-between rounded-3xl
      border-2 border-transparent bg-neutral-100 p-4 dark:bg-neutral-900`,
          {
            'mb-8': isLast,
          },
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
            variant="primary"
            size="icon"
            icon={<Coffee weight="bold" />}
            onPress={toggleOff}
          />
          <Button
            variant="primary"
            size="icon"
            icon={<Power weight="bold" />}
            onPress={handleDisplayConfirmSheet}
          />
        </View>

        <ConfirmSheet
          title={`Activate ${actuator.name}?`}
          description="Are you sure you want to activate this actuator?"
          confirmLabel="Activate"
          ref={confirmSheetRef}
          onConfirm={toggleOn}
          closeOnAction
        />
      </View>
    )
  },
)
