import { SafeScreen } from '@/components/layouts/safe-screen'
import { LoadingIndicator } from '@/components/ui/loading-indicator'
import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import { lime } from 'tailwindcss/colors'

export const LoadingScreen = () => {
  const { colorScheme } = useColorScheme()

  const color = colorScheme === 'dark' ? lime[500] : lime[400]

  return (
    <SafeScreen>
      <View
        className="flex flex-1 items-center justify-center bg-neutral-50
      dark:bg-neutral-950"
      >
        <LoadingIndicator size="large" color={color} />
      </View>
    </SafeScreen>
  )
}
