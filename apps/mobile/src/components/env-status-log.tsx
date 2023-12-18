import { EnvStatusModel } from '@/database/models/env-status-model'
import { mergeTailwind } from '@/utils/tailwind'
import { useColorScheme } from 'nativewind'
import {
  Drop,
  IconContext,
  Leaf,
  Sun,
  Thermometer,
} from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { lime } from 'tailwindcss/colors'

interface EnvStatusLogProps {
  log: EnvStatusModel
  isLast?: boolean
}

export const EnvStatusLog = ({ log, isLast }: EnvStatusLogProps) => {
  const { colorScheme } = useColorScheme()

  return (
    <View
      className={mergeTailwind(
        `mb-2 mt-2 flex-row items-center justify-between rounded-3xl
      border-2 border-transparent bg-neutral-100 p-4 dark:bg-neutral-900`,
        { 'mb-8': isLast },
      )}
      style={{ elevation: 1 }}
    >
      <IconContext.Provider
        value={{
          size: 24,
          color: colorScheme === 'dark' ? lime[500] : lime[400],
        }}
      >
        <View className="flex-row items-center space-x-0.5">
          <Thermometer />
          <View className="flex-row">
            <Text className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              {log.temperature.toFixed(0)}
            </Text>
            <Text className="text-md ml-1 font-bold text-neutral-500 dark:text-neutral-400">
              °C
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-0.5">
          <Drop />
          <View className="flex-row">
            <Text className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              {log.humidity.toFixed(0)}
            </Text>
            <Text className="text-md ml-1 font-bold text-neutral-500 dark:text-neutral-400">
              %
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-0.5">
          <Leaf />
          <View className="flex-row">
            <Text className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              {log.soilMoisture.toFixed(0)}
            </Text>
            <Text className="text-md ml-1 font-bold text-neutral-500 dark:text-neutral-400">
              %
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-0.5">
          <Sun />
          <View className="flex-row">
            <Text className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              {log.light.toFixed(0)}
            </Text>
            <Text className="text-md ml-1 font-bold text-neutral-500 dark:text-neutral-400">
              lux
            </Text>
          </View>
        </View>
      </IconContext.Provider>
    </View>
  )
}
