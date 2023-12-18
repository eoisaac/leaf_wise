import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

// App routes ==================================================================
export type AppStackRoutes = {
  HomeScreen: undefined
  AllMonitorsScreen: undefined
  PreferencesScreen: undefined
  MonitorScreen: { monitorId: string }
}

export type AppNavigationProp = StackNavigationProp<AppStackRoutes>

export type HomeScreenProps = StackScreenProps<AppStackRoutes, 'HomeScreen'>
export type AllMonitorsScreenProps = StackScreenProps<
  AppStackRoutes,
  'AllMonitorsScreen'
>
export type PreferencesScreenProps = StackScreenProps<
  AppStackRoutes,
  'PreferencesScreen'
>
export type MonitorScreenProps = StackScreenProps<
  AppStackRoutes,
  'MonitorScreen'
>
