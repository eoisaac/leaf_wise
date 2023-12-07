import { HomeScreenProps } from '@/@types/routes'
import { HomeHeader } from '@/components/home-header'
import { Button } from '@/components/ui/button'
import { useColorScheme } from 'nativewind'
import { Cpu, ToggleLeft } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { lime } from 'tailwindcss/colors'
import { version } from '../../../package.json'

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { colorScheme } = useColorScheme()
  const iconColor = colorScheme === 'dark' ? lime[500] : lime[400]

  const navigateToAllMonitors = () => navigation.navigate('AllMonitorsScreen')
  const navigateToPreferences = () => navigation.navigate('PreferencesScreen')

  return (
    <View className="relative z-10 flex-1 bg-neutral-50 dark:bg-neutral-950">
      <HomeHeader onButtonPress={navigateToPreferences} />

      <View className="mt-8 flex-1 justify-between space-y-8">
        <View className="space-y-6 px-8">
          <View className="flex-row items-center justify-between space-x-3">
            <Cpu color={iconColor} size={24} />
            <Text className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Monitor
            </Text>
            <Button
              variant="link"
              size="sm"
              className="-mr-2 self-start"
              onPress={navigateToAllMonitors}
            >
              See all
            </Button>
          </View>
          {/* <MonitorCard /> */}
        </View>

        <View className="flex-1 space-y-6 px-8">
          <View className="flex-row items-center justify-between space-x-3">
            <ToggleLeft color={iconColor} size={24} />
            <Text className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Actuators
            </Text>
          </View>
          <View className="flex-1 " />
        </View>

        <View className="items-center pb-3">
          <Text className="text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
            LeafWise - v{version}
          </Text>
        </View>
      </View>
    </View>
  )
}
