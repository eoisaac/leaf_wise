import { useColorScheme } from 'nativewind'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { neutral } from 'tailwindcss/colors'

type SafeScreenProps = SafeAreaViewProps

export const SafeScreen = ({ ...props }: SafeScreenProps) => {
  const { colorScheme } = useColorScheme()

  const backgroundColor = colorScheme === 'dark' ? neutral[950] : neutral[50]

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor }, props.style]}>
      {props.children}
    </SafeAreaView>
  )
}
