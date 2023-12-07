import { AppStackRoutes } from '@/@types/routes'
import { AllMonitorsScreen } from '@/screens/app/all-monitors-screen'
import { HomeScreen } from '@/screens/app/home-screen'
import { PreferencesScreen } from '@/screens/app/preferences-screen'
import { createStackNavigator } from '@react-navigation/stack'

export const AppRoutes = () => {
  const { Screen, Navigator } = createStackNavigator<AppStackRoutes>()

  return (
    <Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="AllMonitorsScreen" component={AllMonitorsScreen} />
      <Screen name="PreferencesScreen" component={PreferencesScreen} />
    </Navigator>
  )
}
