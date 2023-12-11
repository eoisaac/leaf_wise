import 'react-native-gesture-handler'

import { registerRootComponent } from 'expo'
import { App } from './App'

const Main = () => <App />

registerRootComponent(Main)
