import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

// App routes ==================================================================
export type AppStackRoutes = {
  HomeScreen: undefined
  AllMonitorsScreen: undefined
}

export type AppNavigationProp = StackNavigationProp<AppStackRoutes>

export type HomeScreenProps = StackScreenProps<AppStackRoutes, 'HomeScreen'>
export type AllMonitorsScreenProps = StackScreenProps<
  AppStackRoutes,
  'AllMonitorsScreen'
>
