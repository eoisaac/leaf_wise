import { MonitorScreenProps } from '@/@types/routes'
import { ConfirmSheet } from '@/components/confirm-sheet'
import { EnvStatusLog } from '@/components/env-status-log'
import { StackScreen } from '@/components/layouts/stack-screen'
import { NotFoundMessage } from '@/components/not-found-message'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { EnvStatusModel } from '@/database/models/env-status-model'
import { envStatusRepository } from '@/database/repositories/env-status-repository'
import { Trash } from 'phosphor-react-native'
import React from 'react'
import { FlatList, View } from 'react-native'

export const MonitorScreen = ({ navigation, route }: MonitorScreenProps) => {
  const monitorId = route.params.monitorId
  const [envStatuses, setEnvStatuses] = React.useState<EnvStatusModel[]>([])
  const hasStatuses = envStatuses.length > 0
  const lastCardIndex = envStatuses.length - 1

  const { ref, open } = useBottomSheet()

  React.useEffect(() => {
    const subscription = envStatusRepository
      .observeMonitorEnvStatuses(monitorId)
      .subscribe((envStatuses) => setEnvStatuses(envStatuses))

    return () => subscription.unsubscribe()
  }, [monitorId])

  const handleOpenConfirmSheet = () => open()

  const handleClearMonitorLog = () => {
    envStatusRepository.flush(monitorId)
  }

  return (
    <>
      <StackScreen
        navigation={navigation}
        name="Monitor"
        action={
          <Button
            size="icon"
            variant="secondary"
            onPress={handleOpenConfirmSheet}
            icon={<Trash />}
          />
        }
      >
        <View className="flex-1 space-y-4">
          <View className="mt-4 flex-1">
            {hasStatuses ? (
              <FlatList
                data={envStatuses}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <EnvStatusLog log={item} isLast={lastCardIndex === index} />
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <NotFoundMessage message="No logs found" className="flex-1" />
            )}
          </View>
        </View>
      </StackScreen>

      <ConfirmSheet
        ref={ref}
        title="Clear monitor logs"
        description="Are you sure you want to clear the logs? This action cannot be undone."
        onConfirm={handleClearMonitorLog}
        danger
      />
    </>
  )
}
