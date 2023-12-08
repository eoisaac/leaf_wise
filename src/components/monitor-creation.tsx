import { NewMonitorSheet } from '@/components/new-monitor-sheet'
import { RequestPermissionSheet } from '@/components/request-permission-sheet'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button, ButtonProps } from '@/components/ui/button'
import { checkFineLocationPermission } from '@/utils/permissions'

interface MonitorCreationProps {
  buttonLabel?: string
  buttonIcon?: JSX.Element
  buttonVariant?: ButtonProps['variant']
  buttonSize?: ButtonProps['size']
  buttonClassName?: string
}

export const MonitorCreation = ({ ...props }: MonitorCreationProps) => {
  const { ref: monitorSheetRef, open: openMonitorSheet } = useBottomSheet()
  const openMonitorSheetHandler = () => openMonitorSheet()

  const {
    ref: permissionSheetRef,
    open: openPermissionSheet,
    close: closePermissionSheet,
  } = useBottomSheet()
  const openPermissionSheetHandler = () => openPermissionSheet()

  const onGrantPermissionHandler = () => {
    closePermissionSheet()
    openMonitorSheetHandler()
  }

  const checkPermissionAndOpenMonitorSheet = async () => {
    const hasPermission = await checkFineLocationPermission()
    if (!hasPermission) {
      return openPermissionSheetHandler()
    }
    openMonitorSheetHandler()
  }
  return (
    <>
      <Button
        onPress={checkPermissionAndOpenMonitorSheet}
        variant={props.buttonVariant}
        size={props.buttonSize}
        icon={props.buttonIcon}
        className={props.buttonClassName}
      >
        {props.buttonLabel}
      </Button>

      <NewMonitorSheet ref={monitorSheetRef} />
      <RequestPermissionSheet
        onGrantPermission={onGrantPermissionHandler}
        ref={permissionSheetRef}
      />
    </>
  )
}
