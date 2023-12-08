import { SafeScreen } from '@/components/layouts/safe-screen'
import { Button } from '@/components/ui/button'
import { NavigationProp } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { Text, View } from 'react-native'

interface StackScreenProps {
  name?: string
  children: React.ReactNode
  navigation?: NavigationProp<Record<string, object | undefined>>
}

export const StackScreen = ({ navigation, ...props }: StackScreenProps) => {
  const handleGoBack = () => navigation?.goBack()

  return (
    <SafeScreen>
      <View className="mt-8 flex-row items-center justify-between space-x-3 px-8">
        {navigation && (
          <Button
            variant="ghost"
            size="icon"
            className="-ml-3"
            icon={<ArrowLeft size={24} />}
            onPress={handleGoBack}
          />
        )}

        {props.name && (
          <Text className="flex-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {props.name}
          </Text>
        )}
      </View>
      <View className="relative flex-1 p-8">{props.children}</View>
    </SafeScreen>
  )
}
