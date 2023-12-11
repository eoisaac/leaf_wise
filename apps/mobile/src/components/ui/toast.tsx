import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { X } from 'phosphor-react-native'
import React from 'react'
import { Text, View } from 'react-native'
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface BaseToastProps {
  title?: string
  message: string
}

export interface ToastProps extends BaseToastProps {
  id: string
}

interface ToastRootProps {
  children: React.ReactNode
}

export const Toast = ({ ...props }: ToastProps) => {
  const { hideToast } = useToast()

  React.useEffect(() => {
    const timer = setTimeout(() => {
      hideToast(props.id)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleHide = () => hideToast(props.id)

  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutUp}
      className="flex-row items-center justify-between space-x-4 rounded-3xl 
      bg-neutral-100 p-4 dark:bg-neutral-900"
      style={{ elevation: 1 }}
    >
      <View className="flex-1">
        <Text className="mb-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {props.title}
        </Text>
        <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {props.message}
        </Text>
      </View>
      <Button
        variant="ghost2"
        size="icon"
        icon={<X weight="bold" />}
        onPress={handleHide}
      />
    </Animated.View>
  )
}

export const ToastRoot = (props: ToastRootProps) => {
  const { toasts } = useToast()

  return (
    <View className="relative flex-1">
      <SafeAreaView
        style={{
          gap: 8,
          position: 'absolute',
          top: 64,
          left: 16,
          right: 16,
          zIndex: 9999,
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </SafeAreaView>
      {props.children}
    </View>
  )
}
