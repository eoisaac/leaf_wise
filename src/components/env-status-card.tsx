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

  return (
    <IconContext.Provider
      value={{
        size: 24,
        color: colorScheme === 'dark' ? lime[500] : lime[400],
      }}
    >
      <View
        className={mergeTailwind(
          `mb-1 ml-2 mr-2 h-32 w-32 items-center justify-between rounded-3xl
          bg-neutral-100 p-2 dark:bg-neutral-900`,
          { 'ml-8': props.isFirst, 'mr-8': props.isLast },
        )}
        style={{ elevation: 1 }}
      >
        <View className="ml-1 mt-1 self-start">{props.icon}</View>
        <View className="flex-row">
          <Text className="text-5xl font-semibold text-neutral-900 dark:text-neutral-100">
            {props.status.value}
          </Text>
          <Text className="text-xl font-bold text-neutral-500 dark:text-neutral-400">
            {props.status.unit}
          </Text>
        </View>
        <Text className="text-base font-normal text-neutral-500 dark:text-neutral-400">
          {camelCaseToWords(props.envStatusType)}
        </Text>
      </View>
    </IconContext.Provider>
  )
}
