import { PreferencesScreenProps } from '@/@types/routes'
import { StackScreen } from '@/components/layouts/stack-screen'
import { NewMonitorSheet } from '@/components/new-monitor-sheet'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBar } from '@/components/ui/status-bar'
import { Plus } from 'phosphor-react-native'
import React from 'react'
import { View } from 'react-native'

export const AllMonitorsScreen = ({ navigation }: PreferencesScreenProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = React.useState('')

  const handleSearch = (text: string) => setSearch(text)

  const { ref, open } = useBottomSheet()
  const handleOpenSheet = () => open()

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
            onPress={handleOpenSheet}
          />
        </View>
      </StackScreen>

      <NewMonitorSheet ref={ref} />
    </>
  )
}
