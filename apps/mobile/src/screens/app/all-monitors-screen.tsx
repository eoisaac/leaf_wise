import { PreferencesScreenProps } from '@/@types/routes'
import { StackScreen } from '@/components/layouts/stack-screen'
import { MonitorCard } from '@/components/monitor-card'
import { MonitorCreation } from '@/components/monitor-creation'
import { NotFoundMessage } from '@/components/not-found-message'
import { Input } from '@/components/ui/input'
import { StatusBar } from '@/components/ui/status-bar'
import { useMonitor } from '@/contexts/monitor-context'
import { Plus } from 'phosphor-react-native'
import React from 'react'
import { FlatList, View } from 'react-native'

export const AllMonitorsScreen = ({ navigation }: PreferencesScreenProps) => {
  const [search, setSearch] = React.useState('')

  const { monitors } = useMonitor()

  const filteredMonitors = monitors.filter((monitor) =>
    monitor.name.toLowerCase().includes(search.toLowerCase()),
  )
  const hasMonitors = filteredMonitors.length > 0
  const lastCardIndex = filteredMonitors.length - 1

  const handleSearchChange = (text: string) => setSearch(text)

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
                <MonitorCard monitor={item} isLast={lastCardIndex === index} />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NotFoundMessage message="No monitors found" className="flex-1" />
          )}
        </View>
      </StackScreen>
      <View
        className="absolute bottom-8 right-8 rounded-2xl bg-neutral-50 dark:bg-neutral-950"
        style={{ elevation: 1 }}
      >
        <MonitorCreation
          buttonSize="icon"
          buttonIcon={<Plus size={24} weight="bold" />}
        />
      </View>
    </>
  )
}
