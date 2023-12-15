import { HomeScreenProps } from '@/@types/routes'
import { HomeHeader } from '@/components/home-header'
import { MonitorCreation } from '@/components/monitor-creation'
import { SelectedMonitorDetails } from '@/components/selected-monitor-details'
import { useMonitor } from '@/contexts/monitor-context'
import { Text, View } from 'react-native'
import { version } from '../../../package.json'

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { selectedMonitor } = useMonitor()

  const navigateToAllMonitors = () => navigation.navigate('AllMonitorsScreen')
  const navigateToPreferences = () => navigation.navigate('PreferencesScreen')

  return (
    <View className="relative z-10 flex-1 bg-neutral-50 dark:bg-neutral-950">
      <HomeHeader onButtonPress={navigateToPreferences} />

      {selectedMonitor ? (
        <View className="mt-8 flex-1">
          <SelectedMonitorDetails
            monitor={selectedMonitor}
            onSeeAllPress={navigateToAllMonitors}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center space-y-2 p-8">
          <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            No monitors yet
          </Text>
          <Text
            className="mb-6 px-3 text-center text-base font-normal text-neutral-500 
          dark:text-neutral-400"
          >
            Create a new monitor to start tracking and monitoring your plants.
          </Text>

          <MonitorCreation
            buttonLabel="Create a new monitor"
            buttonClassName="w-full"
            isFirstMonitor
          />
        </View>
      )}

      <View className="items-center pb-3">
        <Text className="text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
          LeafWise - v{version}
        </Text>
      </View>
    </View>
  )
}
