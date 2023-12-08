import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef,
} from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Text, View } from 'react-native'

interface ConfirmSheetProps extends BottomSheetProps {
  description?: string
  closeOnAction?: boolean
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

const ConfirmSheet = React.forwardRef<BottomSheetRef, ConfirmSheetProps>(
  (
    {
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      danger = false,
      ...props
    },
    ref,
  ) => {
    const closeSheet = () => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.close()
      }
    }

    const handleCancel = async () => {
      props.onCancel?.()
    }

    const handleConfirmAndClose = async () => {
      props.onConfirm?.()
      closeSheet()
    }

    const handleCancelAndClose = async () => {
      handleCancel()
      closeSheet()
    }

    return (
      <BottomSheet ref={ref} {...props}>
        <View className="mb-6 space-y-6">
          <Text className="text-center text-base font-normal text-neutral-500 dark:text-neutral-400">
            {props.description}
          </Text>
          <View className="item-center flex-row space-x-4">
            <Button
              variant="ghost2"
              className="flex-1"
              onPress={handleCancelAndClose}
            >
              {cancelLabel}
            </Button>
            <Button
              className="flex-1"
              variant={danger ? 'danger' : 'primary'}
              onPress={handleConfirmAndClose}
            >
              {confirmLabel}
            </Button>
          </View>
        </View>
      </BottomSheet>
    )
  },
)

ConfirmSheet.displayName = 'ConfirmSheet'

export { ConfirmSheet }
