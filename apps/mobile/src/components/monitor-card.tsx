import { ConfirmSheet } from '@/components/confirm-sheet'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { MonitorModel } from '@/database/models/monitor-model'
import { mergeTailwind } from '@/utils/tailwind'
import { withObservables } from '@nozbe/watermelondb/react'
import { CaretRight, Info } from 'phosphor-react-native'
import { Text, View } from 'react-native'

interface MonitorCardProps {
  monitor: MonitorModel
  isLast?: boolean
  className?: string
  onInfoPress?: () => void
}

const enhance = withObservables(['monitor'], ({ monitor }) => ({
  monitor: monitor.observe(),
}))

export const MonitorCard = enhance(
  ({ monitor, isLast = false, className, onInfoPress }: MonitorCardProps) => {
    const { ref, open } = useBottomSheet()

    const handleOpenConfirmSheet = () => open()

    const monitorDisplayId = monitor.id.slice(0, 13)

    const handleSelectMonitor = () => monitor.setSelected(true)
    const handleInfoPress = () => onInfoPress?.()

    return (
      <>
        <View
          className={mergeTailwind(
            `mb-2 mt-2 flex-row items-center justify-between rounded-2xl
        border-2 border-transparent bg-neutral-100 p-4 dark:bg-neutral-900`,
            className,
            {
              'border-lime-400 dark:border-lime-500': monitor.isSelected,
              'mb-8': isLast,
            },
          )}
          style={{ elevation: 1 }}
        >
          <View>
            <Text className="mb-1 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {monitor.name}
            </Text>
            <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              #{monitorDisplayId}
            </Text>
          </View>

          {monitor.isSelected ? (
            <Button
              variant="ghost2"
              size="icon"
              icon={<Info weight="bold" />}
              onPress={handleInfoPress}
            />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              icon={<CaretRight weight="bold" />}
              onPress={handleOpenConfirmSheet}
            />
          )}
        </View>
        <ConfirmSheet
          ref={ref}
          title={`Select ${monitor.name}?`}
          description="Are you sure you want to select this monitor?"
          onConfirm={handleSelectMonitor}
          closeOnAction
        />
      </>
    )
  },
)
