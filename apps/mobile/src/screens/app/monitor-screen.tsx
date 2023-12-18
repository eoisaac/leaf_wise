import { MonitorScreenProps } from '@/@types/routes'
import { StackScreen } from '@/components/layouts/stack-screen'
import { envStatusRepository } from '@/database/repositories/env-status-repository'
import React from 'react'
import { Text, View } from 'react-native'

export const MonitorScreen = ({ navigation, route }: MonitorScreenProps) => {
  const monitorId = route.params.monitorId

  React.useEffect(() => {
    const subscription = envStatusRepository
      .observeMonitorEnvStatuses(monitorId)
      .subscribe((envStatuses) => console.log(envStatuses))

    return () => subscription.unsubscribe()
  }, [monitorId])

  return (
    <StackScreen navigation={navigation} name="Monitor">
      <View className="flex-1 justify-between">
        <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {monitorId}
        </Text>
      </View>
    </StackScreen>
  )
}
