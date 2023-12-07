import { Button } from '@/components/ui/button'
import { MonitorModel } from '@/database/models/monitor-model'
import { mergeTailwind } from '@/utils/tailwind'
import { CaretRight, Info } from 'phosphor-react-native'
import { Text, View } from 'react-native'

interface MonitorCardProps {
  monitor: MonitorModel
  isSelected?: boolean
  isLast?: boolean
  onButtonPress?: (monitor?: MonitorModel) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MonitorCard = ({
  monitor,
  onButtonPress,
  ...props
}: MonitorCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const monitorDisplayId = monitor?.id.slice(0, 13)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelectMonitor = () => onButtonPress?.(monitor)

  return (
    <View
      className={mergeTailwind(
        `mb-2 mt-2 flex-row items-center justify-between rounded-2xl
      border-2 border-transparent bg-neutral-100 p-4 dark:bg-neutral-900`,
        {
          'border-lime-400 dark:border-lime-500': props.isSelected,
          'mb-8': props.isLast,
        },
      )}
      style={{ elevation: 1 }}
    >
      <View>
        <Text className="mb-1 text-xl font-bold text-neutral-900 dark:text-neutral-100">
          {/* {monitor.name} */}
          Monitor Name
        </Text>
        <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {/* #{monitorDisplayId} */}
          #1234567890123
        </Text>
      </View>

      {props.isSelected ? (
        <Button variant="ghost2" size="icon" icon={<Info weight="bold" />} />
      ) : (
        <Button
          variant="ghost"
          size="icon"
          icon={<CaretRight weight="bold" />}
          // onPress={handleDisplayConfirmSheet}
        />
      )}
    </View>
  )
}
