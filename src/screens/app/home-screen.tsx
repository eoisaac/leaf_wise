import { HomeHeader } from '@/components/home-header'
import { Text, View } from 'react-native'

export const HomeScreen = () => {
  return (
    <View className="relative z-10 flex-1">
      <HomeHeader />

      <Text className="mt-8 text-center text-2xl">Home Screen</Text>
    </View>
  )
}
