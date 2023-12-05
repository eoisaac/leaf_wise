import { EnvStatusList } from '@/components/env-status-list'
import { StatusBar } from '@/components/ui/status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { useColorScheme } from 'nativewind'
import { Text, View } from 'react-native'
import { lime } from 'tailwindcss/colors'

interface HomeHeaderProps {
  onProfilePress?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const HomeHeader = ({ onProfilePress }: HomeHeaderProps) => {
  const { colorScheme } = useColorScheme()

  const usernameDisplay = 'Isaac'

  return (
    <View>
      <StatusBar mode="light" />

      <View className="z-50 mt-16 flex-row items-center justify-between px-8">
        <View>
          <Text className="font-bold text-4xl text-neutral-100">
            Hi, {usernameDisplay}
          </Text>
          <Text className="text-lg text-neutral-100">Manage your plants</Text>
        </View>
        {/* <Button
          variant="ghost"
          size="icon"
          className="-mr-3"
          icon={<UserCircle size={32} color={neutral[50]} />}
          onPress={onProfilePress}
        /> */}
      </View>

      <View className="z-50 mt-16">
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
        style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
      />
    </View>
  )
}
