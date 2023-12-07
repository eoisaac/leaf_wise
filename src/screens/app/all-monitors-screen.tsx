import { PreferencesScreenProps } from '@/@types/routes'
import { StackScreen } from '@/components/layouts/stack-screen'
import { NewMonitorSheet } from '@/components/new-monitor-sheet'
import { RequestPermissionSheet } from '@/components/request-permission-sheet'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBar } from '@/components/ui/status-bar'
import { checkFineLocationPermission } from '@/utils/permissions'
import { Plus } from 'phosphor-react-native'
import React from 'react'
import { View } from 'react-native'

export const AllMonitorsScreen = ({ navigation }: PreferencesScreenProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = React.useState('')

  const handleSearch = (text: string) => setSearch(text)

  const { ref: monitorSheetRef, open: openMonitorSheet } = useBottomSheet()
  const handleOpenMonitorSheet = () => openMonitorSheet()

  const {
    ref: permissionSheetRef,
    open: openPermissionSheet,
    close: closePermissionSheet,
  } = useBottomSheet()
  const handleOpenPermissionSheet = () => openPermissionSheet()

  const handleOnGrantPermission = () => {
    closePermissionSheet()
    handleOpenMonitorSheet()
  }

  const handleCheckPermissionAndOpenNewMonitorSheet = async () => {
    const hasPermission = await checkFineLocationPermission()
    if (!hasPermission) {
      return handleOpenPermissionSheet()
    }
    handleOpenMonitorSheet()
  }

  return (
    <>
      <StackScreen navigation={navigation} name="All monitors">
        <StatusBar mode="auto" />
        <Input placeholder="Search" onChangeText={handleSearch} />

        <View
          className="absolute bottom-8 right-8 rounded-2xl
      bg-neutral-50 dark:bg-neutral-950"
          style={{ elevation: 1 }}
        >
          <Button
            size="icon"
            icon={<Plus size={24} weight="bold" />}
            onPress={handleCheckPermissionAndOpenNewMonitorSheet}
          />
        </View>
      </StackScreen>

      <NewMonitorSheet ref={monitorSheetRef} />
      <RequestPermissionSheet
        onGrantPermission={handleOnGrantPermission}
        ref={permissionSheetRef}
      />
    </>
  )
}
