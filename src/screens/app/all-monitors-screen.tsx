import { PreferencesScreenProps } from '@/@types/routes'
import { StackScreen } from '@/components/layouts/stack-screen'
import { MonitorCard } from '@/components/monitor-card'
import { NewMonitorSheet } from '@/components/new-monitor-sheet'
import { NotFoundMessage } from '@/components/not-found-message'
import { RequestPermissionSheet } from '@/components/request-permission-sheet'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBar } from '@/components/ui/status-bar'
import { MonitorModel } from '@/database/models/monitor-model'
import { monitorRepository } from '@/database/repositories/monitor-repository'
import { checkFineLocationPermission } from '@/utils/permissions'
import { Plus } from 'phosphor-react-native'
import React from 'react'
import { FlatList, View } from 'react-native'

export const AllMonitorsScreen = ({ navigation }: PreferencesScreenProps) => {
  const [monitors, setMonitors] = React.useState<MonitorModel[]>([])
  const [search, setSearch] = React.useState('')

  const filteredMonitors = monitors.filter((monitor) =>
    monitor.name.toLowerCase().includes(search.toLowerCase()),
  )
  const hasMonitors = filteredMonitors.length > 0
  const lastCardIndex = filteredMonitors.length - 1

  const handleSearchChange = (text: string) => setSearch(text)

  const { ref: monitorSheetRef, open: openMonitorSheet } = useBottomSheet()
  const openMonitorSheetHandler = () => openMonitorSheet()

  const {
    ref: permissionSheetRef,
    open: openPermissionSheet,
    close: closePermissionSheet,
  } = useBottomSheet()
  const openPermissionSheetHandler = () => openPermissionSheet()

  const onGrantPermissionHandler = () => {
    closePermissionSheet()
    openMonitorSheetHandler()
  }

  const checkPermissionAndOpenMonitorSheet = async () => {
    const hasPermission = await checkFineLocationPermission()
    if (!hasPermission) {
      return openPermissionSheetHandler()
    }
    openMonitorSheetHandler()
  }

  React.useEffect(() => {
    const subscription = monitorRepository
      .observeAll()
      .subscribe((monitors) => setMonitors(monitors))
    return () => subscription.unsubscribe()
  }, [])

  const selectMonitor = async (monitor: MonitorModel) => {
    await monitorRepository.select(monitor.id)
  }

  return (
    <>
      <StackScreen navigation={navigation} name="All monitors">
        <StatusBar mode="auto" />
        <Input placeholder="Search" onChangeText={handleSearchChange} />

        <View className="mt-4 flex-1">
          {hasMonitors ? (
            <FlatList
              data={filteredMonitors}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <MonitorCard
                  monitor={item}
                  isLast={lastCardIndex === index}
                  onButtonPress={selectMonitor}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NotFoundMessage message="No monitors found" />
          )}
        </View>

        <View
          className="absolute bottom-8 right-8 rounded-2xl bg-neutral-50 dark:bg-neutral-950"
          style={{ elevation: 1 }}
        >
          <Button
            size="icon"
            icon={<Plus size={24} weight="bold" />}
            onPress={checkPermissionAndOpenMonitorSheet}
          />
        </View>
      </StackScreen>

      <NewMonitorSheet ref={monitorSheetRef} />
      <RequestPermissionSheet
        onGrantPermission={onGrantPermissionHandler}
        ref={permissionSheetRef}
      />
    </>
  )
}
