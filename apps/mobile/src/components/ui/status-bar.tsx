import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'

interface StatusBarProps {
  mode?: 'light' | 'dark' | 'auto'
}

export const StatusBar = ({ mode = 'auto' }: StatusBarProps) => {
  const { colorScheme } = useColorScheme()

  const isDark = colorScheme === 'dark'
  const color = mode === 'auto' ? (isDark ? 'light' : 'dark') : mode

  return (
    <ExpoStatusBar
      style={color}
      backgroundColor="transparent"
      translucent
      animated
    />
  )
}
