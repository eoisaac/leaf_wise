import { ActuatorCard } from '@/components/actuator-card'
import { MonitorCard } from '@/components/monitor-card'
import { NotFoundMessage } from '@/components/not-found-message'
import { Button } from '@/components/ui/button'
import { ActuatorModel } from '@/database/models/actuator-model'
import { MonitorModel } from '@/database/models/monitor-model'
import { withObservables } from '@nozbe/watermelondb/react'
import { Cpu, ToggleLeft } from 'phosphor-react-native'
import { FlatList, Text, View, useColorScheme } from 'react-native'
import { lime } from 'tailwindcss/colors'

interface SelectedMonitorDetailsProps {
  monitor: MonitorModel
  actuators: ActuatorModel[]
  onSeeAllPress: () => void
  onInfoPress: () => void
}

const enhance = withObservables(['monitor'], ({ monitor }) => ({
  monitor: monitor.observe(),
  actuators: monitor.actuators.observe(),
}))

export const SelectedMonitorDetails = enhance(
  ({
    monitor,
    actuators,
    onSeeAllPress,
    onInfoPress,
  }: SelectedMonitorDetailsProps) => {
    const colorScheme = useColorScheme()
    const iconColor = colorScheme === 'dark' ? lime[500] : lime[400]

    const hasActuators = actuators.length > 0
    const lastCardIndex = actuators.length - 1

    return (
      <View className="flex-1 space-y-4">
        <View className="px-8">
          <View className="mb-3 flex-row items-center justify-between space-x-3">
            <Cpu color={iconColor} size={24} />
            <Text className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Monitor
            </Text>
            <Button
              variant="link"
              size="sm"
              className="-mr-2 self-start"
              onPress={onSeeAllPress}
            >
              See all
            </Button>
          </View>

          <MonitorCard monitor={monitor} onInfoPress={onInfoPress} />
        </View>

        <View className="flex-1 px-8">
          <View className="mb-3 flex-row items-center justify-between space-x-3">
            <ToggleLeft color={iconColor} size={24} />
            <Text className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Actuators
            </Text>
          </View>

          <View className="flex-1">
            {hasActuators ? (
              <FlatList
                data={actuators}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <ActuatorCard
                    actuator={item}
                    isLast={lastCardIndex === index}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <NotFoundMessage message="No actuators found" />
            )}
          </View>
        </View>
      </View>
    )
  },
)
