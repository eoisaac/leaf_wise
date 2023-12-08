// import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { ActuatorModel } from '@/database/models/actuator-model'
import { mergeTailwind } from '@/utils/tailwind'
import { withObservables } from '@nozbe/watermelondb/react'
import { Gear, Power } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { ConfirmSheet } from './confirm-sheet'
import { useBottomSheet } from './ui/bottom-sheet'

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
            icon={<Power weight="bold" />}
            onPress={handleDisplayConfirmSheet}
          />
        </View>

        <ConfirmSheet
          title={`Activate ${actuator.name}?`}
          description="Are you sure you want to activate this actuator?"
          confirmLabel="Activate"
          ref={confirmSheetRef}
          closeOnAction
        />
      </View>
    )
  },
)
