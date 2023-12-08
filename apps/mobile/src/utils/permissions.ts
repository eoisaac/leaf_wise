import { PermissionsAndroid } from 'react-native'

export const requestFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )
  return granted === PermissionsAndroid.RESULTS.GRANTED
}

export const checkFineLocationPermission = async () => {
  return await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )
}
