import { EnvStatusCard } from '@/components/env-status-card'
import { Drop, Leaf, Sun, Thermometer } from 'phosphor-react-native'
import { FlatList } from 'react-native'

export interface EnvStatus {
  value: number
  unit: string
}

export type EnvStatusType =
  | 'temperature'
  | 'humidity'
  | 'soilMoisture'
  | 'light'

export type EnvData = {
  [K in EnvStatusType]: EnvStatus
}

const statusIcons: Record<EnvStatusType, JSX.Element> = {
  temperature: <Thermometer />,
  humidity: <Drop />,
  soilMoisture: <Leaf />,
  light: <Sun />,
}

const data: EnvData = {
  temperature: {
    value: 25,
    unit: '°C',
  },
  humidity: {
    value: 60,
    unit: '%',
  },
  soilMoisture: {
    value: 40,
    unit: '%',
  },
  light: {
    value: 500,
    unit: 'lux',
  },
}

export const EnvStatusList = () => {
  const dataList = Object.entries(data).map(([envType, status]) => ({
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
