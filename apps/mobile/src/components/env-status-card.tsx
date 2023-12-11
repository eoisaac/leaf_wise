import { EnvStatus, EnvStatusType } from '@/components/env-status-list'
import { camelCaseToWords } from '@/utils/string'
import { mergeTailwind } from '@/utils/tailwind'
import { useColorScheme } from 'nativewind'
import { IconContext } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { lime } from 'tailwindcss/colors'

interface EnvStatusCardProps {
  isFirst?: boolean
  isLast?: boolean
  icon: JSX.Element
  status: EnvStatus
  envStatusType: EnvStatusType
}

export const EnvStatusCard = ({ ...props }: EnvStatusCardProps) => {
  const { colorScheme } = useColorScheme()

  const getDisplayValue = (value: string) =>
    value === '-' ? value : parseFloat(value).toFixed(1)

  const displayValue = getDisplayValue(props.status.value)
  const displayName = camelCaseToWords(props.envStatusType)
  const displayUnit = props.status.unit === 'C' ? '°C' : props.status.unit

  return (
    <IconContext.Provider
      value={{
        size: 24,
        color: colorScheme === 'dark' ? lime[500] : lime[400],
      }}
    >
      <View
        className={mergeTailwind(
          `mb-1 ml-2 mr-2 h-28 w-28 items-center justify-between rounded-2xl
          bg-neutral-100 p-2 dark:bg-neutral-900`,
          { 'ml-8': props.isFirst, 'mr-8': props.isLast },
        )}
        style={{ elevation: 1 }}
      >
        <View className="ml-1 mt-1 self-start">{props.icon}</View>
        <View className="flex-row">
          <Text className="text-4xl font-semibold text-neutral-900 dark:text-neutral-100">
            {displayValue}
          </Text>
          <Text className="ml-1 text-lg font-bold text-neutral-500 dark:text-neutral-400">
            {displayUnit}
          </Text>
        </View>
        <Text className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
          {displayName}
        </Text>
      </View>
    </IconContext.Provider>
  )
}
