import { AppRoutes } from '@/routes/navigation/app-routes'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { View, useColorScheme } from 'react-native'

export const Routes = () => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <View className="flex-1">
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
