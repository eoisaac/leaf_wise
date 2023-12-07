import { styled } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'
import { Modalize, ModalizeProps, useModalize } from 'react-native-modalize'

type BottomSheetRef = Modalize

interface BottomSheetHeaderProps {
  title?: string
}

interface BottomSheetProps extends ModalizeProps, BottomSheetHeaderProps {}

const SheetWrapper = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  (props, ref) => {
    return (
      <Modalize
        ref={ref}
        modalStyle={props.modalStyle}
        overlayStyle={props.overlayStyle}
        handleStyle={props.handleStyle}
        {...props}
      >
        {props.children}
      </Modalize>
    )
  },
)

SheetWrapper.displayName = 'SheetWrapper'

const StyledBottomSheet = styled(SheetWrapper, {
  props: {
    modalStyle: true,
    overlayStyle: true,
    handleStyle: true,
  },
})

const BottomSheetHeader = ({ title }: BottomSheetHeaderProps) => {
  return (
    <View className="mb-6">
      <Text className="text-center text-xl font-bold text-neutral-900 dark:text-neutral-100">
        {title}
      </Text>
    </View>
  )
}

const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      title,
      HeaderComponent = <BottomSheetHeader title={title} />,
      adjustToContentHeight = true,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledBottomSheet
        ref={ref}
        HeaderComponent={HeaderComponent}
        modalStyle="bg-neutral-50 p-8 pb-12 dark:bg-neutral-900 rounded-t-3xl"
        overlayStyle="bg-neutral-950/50"
        handleStyle="h-[6px] w-14 rounded-lg bg-neutral-200 dark:bg-neutral-700"
        adjustToContentHeight={adjustToContentHeight}
        {...props}
      />
    )
  },
)

const useBottomSheet = () => useModalize()

BottomSheet.displayName = 'BottomSheet'

export { BottomSheet, BottomSheetProps, BottomSheetRef, useBottomSheet }
