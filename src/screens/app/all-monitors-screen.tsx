import { PreferencesScreenProps } from '@/@types/routes'
import { StackScreen } from '@/components/layouts/stack-screen'
import { Text, View } from 'react-native'

export const AllMonitorsScreen = ({ navigation }: PreferencesScreenProps) => {
  return (
    <StackScreen navigation={navigation} name="All monitors">
      <View>
        <Text className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          All Monitors Screen
        </Text>
      </View>
    </StackScreen>
  )
}
