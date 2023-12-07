import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef,
} from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { requestFineLocationPermission } from '@/utils/permissions'
import { WifiHigh } from 'phosphor-react-native'
import React from 'react'
import { Text, View } from 'react-native'
import { neutral } from 'tailwindcss/colors'

interface RequestPermissionSheetProps extends BottomSheetProps {
  onGrantPermission: () => void
}

const RequestPermissionSheet = React.forwardRef<
  BottomSheetRef,
  RequestPermissionSheetProps
>(({ onGrantPermission, ...props }: RequestPermissionSheetProps, ref) => {
  const handleRequestPermission = async () => {
    const granted = await requestFineLocationPermission()
    granted && onGrantPermission()
  }

  return (
    <BottomSheet ref={ref} title="Network Permission Request" {...props}>
      <View className="mb-6 items-center space-y-6">
        <WifiHigh size={48} color={neutral[400]} />
        <Text className="text-center text-base font-normal text-neutral-500 dark:text-neutral-400">
          Location permission is required for WiFi networks. We need your
          location to connect to and monitor the network.
        </Text>
        <Button className="w-full" onPress={handleRequestPermission}>
          Grant permission
        </Button>
      </View>
    </BottomSheet>
  )
})

RequestPermissionSheet.displayName = 'RequestPermissionSheet'
export { RequestPermissionSheet }
