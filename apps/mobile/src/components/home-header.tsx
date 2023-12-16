import { EnvStatusList } from '@/components/env-status-list'
import { Button } from '@/components/ui/button'
import { StatusBar } from '@/components/ui/status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { useColorScheme } from 'nativewind'
import { Gear } from 'phosphor-react-native'
import { Text, View } from 'react-native'
import { lime, neutral } from 'tailwindcss/colors'

interface HomeHeaderProps {
  onButtonPress?: () => void
}

export const HomeHeader = ({ onButtonPress }: HomeHeaderProps) => {
  const { colorScheme } = useColorScheme()

  // const usernameDisplay = 'Isaac'

  return (
    <View>
      <StatusBar mode="light" />

      <View
        className="z-[99] mt-16 flex-row items-center justify-between px-8"
        style={{ zIndex: 99 }}
      >
        <View>
          <Text className="text-4xl font-bold text-neutral-100">
            {/* Hi, {usernameDisplay} */}
            LeafWise
          </Text>
          <Text className="text-lg text-neutral-100">Manage your plants</Text>
        </View>
        <Button
          variant="ghost"
          size="icon"
          className="-mr-3"
          icon={<Gear size={32} color={neutral[50]} />}
          onPress={onButtonPress}
        />
      </View>

      <View className="z-50 mt-16" style={{ zIndex: 50 }}>
        <EnvStatusList />
      </View>

      <LinearGradient
        key="header-gradient"
        start={{ x: 0.0, y: 0.2 }}
        end={{ x: 0.2, y: 1.0 }}
        locations={[0.2, 0.9]}
        colors={
          colorScheme === 'dark'
            ? [lime[700], lime[500]]
            : [lime[500], lime[300]]
        }
        className="absolute inset-x-0 top-0 z-20 h-64"
        style={{
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          elevation: 1,
          zIndex: 20,
        }}
      />
    </View>
  )
}
