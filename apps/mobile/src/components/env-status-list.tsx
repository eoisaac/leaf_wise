import { EnvStatusCard } from '@/components/env-status-card'
import { useMonitor } from '@/contexts/monitor-context'
import { envStatusRepository } from '@/database/repositories/env-status-repository'
import { useMQTT } from '@/hooks/use-mqtt'
import { Drop, Leaf, Sun, Thermometer } from 'phosphor-react-native'
import React from 'react'
import { FlatList, View } from 'react-native'

export interface EnvStatus {
  value: string
  unit: string
}

export type EnvStatusType =
  | 'temperature'
  | 'humidity'
  | 'soil_moisture'
  | 'light'

export type EnvData = {
  [K in EnvStatusType]: EnvStatus
}

const statusIcons: Record<EnvStatusType, JSX.Element> = {
  temperature: <Thermometer />,
  humidity: <Drop />,
  soil_moisture: <Leaf />,
  light: <Sun />,
}

export const EnvStatusList = () => {
  const mqtt = useMQTT()
  const { selectedMonitor } = useMonitor()

  const [data, setData] = React.useState<EnvData | null>(null)

  const convert = (_: string, message: string) => {
    if (!selectedMonitor) return
    const parsed = JSON.parse(message) as EnvData
    setData(parsed)
    envStatusRepository.create({
      humidity: parsed.humidity.value,
      soilMoisture: parsed.humidity.value,
      temperature: parsed.temperature.value,
      light: parsed.light.value,
      monitorId: selectedMonitor!.id,
    })
  }

  React.useEffect(() => {
    if (!selectedMonitor) return setData(null)
    mqtt.subscribe(selectedMonitor.id, convert)
  }, [mqtt, selectedMonitor])

  const dataList = data
    ? Object.entries(data).map(([envType, status]) => ({
        envType: envType as EnvStatusType,
        status,
      }))
    : []

  const fistItemIndex = 0
  const lastItemIndex = dataList.length - 1

  return data ? (
    <FlatList
      data={dataList}
      keyExtractor={(item) => item.envType}
      renderItem={({ item, index }) => (
        <EnvStatusCard
          icon={statusIcons[item.envType]}
          status={item.status}
          envStatusType={item.envType}
          isFirst={index === fistItemIndex}
          isLast={index === lastItemIndex}
        />
      )}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  ) : (
    <View className="h-28 w-full" />
  )
}
