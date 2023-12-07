import { AllMonitorsScreenProps } from '@/@types/routes'
import { StackScreen } from '@/components/layouts/stack-screen'
import { Text, View } from 'react-native'

export const PreferencesScreen = ({ navigation }: AllMonitorsScreenProps) => {
  return (
    <StackScreen navigation={navigation} name="Preferences">
      <View>
        <Text className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Preferences
        </Text>
      </View>
    </StackScreen>
  )
}
