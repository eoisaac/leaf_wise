import { EnvStatusCard } from '@/components/env-status-card'
import { useMQTT } from '@/hooks/use-mqtt'
import { Drop, Leaf, Sun, Thermometer } from 'phosphor-react-native'
import React from 'react'
import { FlatList } from 'react-native'

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

const baseData: EnvData = {
  temperature: {
    value: '-',
    unit: '°C',
  },
  humidity: {
    value: '-',
    unit: '%',
  },
  soil_moisture: {
    value: '-',
    unit: '%',
  },
  light: {
    value: '-',
    unit: 'lux',
  },
}

export const EnvStatusList = () => {
  const mqtt = useMQTT()

  const [data, setData] = React.useState<EnvData>(baseData)

  const convert = (topic: string, message: string) =>
    setData(JSON.parse(message))

  React.useEffect(() => {
    mqtt.subscribe('env_status', convert)
  }, [mqtt])

  const envData = data ?? baseData
  const dataList = Object.entries(envData).map(([envType, status]) => ({
    envType: envType as EnvStatusType,
    status,
  }))

  const fistItemIndex = 0
  const lastItemIndex = dataList.length - 1

  return (
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
  )
}
