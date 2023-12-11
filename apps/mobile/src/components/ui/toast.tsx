import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { mergeTailwind } from '@/utils/tailwind'
import { VariantProps, cva } from 'cva'
import { X } from 'phosphor-react-native'
import React from 'react'
import { Text, View } from 'react-native'
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated'
import { neutral } from 'tailwindcss/colors'

const toastVariants = cva(
  'flex-row items-center justify-between space-x-4 rounded-3xl p-4 pt-12',
  {
    variants: {
      variant: {
        neutral: 'bg-neutral-100 dark:bg-neutral-900',
        danger: 'bg-red-500 dark:bg-red-600',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

export interface BaseToastProps extends VariantProps<typeof toastVariants> {
  title?: string
  message: string
  closeButton?: boolean
  className?: string
}

export interface ToastProps extends BaseToastProps {
  id: string
}

interface ToastRootProps {
  children: React.ReactNode
}

export const Toast = ({
  variant = 'neutral',
  closeButton = true,
  className,
  ...props
}: ToastProps) => {
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
      className={mergeTailwind(toastVariants({ variant, className }))}
      style={{ elevation: 1 }}
    >
      <View className="flex-1">
        <Text
          className={mergeTailwind(
            'mb-1 text-lg font-bold text-neutral-900 dark:text-neutral-100',
            {
              'text-neutral-100': variant === 'danger',
            },
          )}
        >
          {props.title}
        </Text>
        <Text
          className={mergeTailwind(
            'text-sm font-medium text-neutral-500 dark:text-neutral-400',
            {
              'text-neutral-100': variant === 'danger',
            },
          )}
        >
          {props.message}
        </Text>
      </View>
      {closeButton && (
        <Button
          variant="ghost"
          size="icon"
          icon={<X weight="bold" color={neutral[100]} />}
          onPress={handleHide}
        />
      )}
    </Animated.View>
  )
}

export const ToastRoot = (props: ToastRootProps) => {
  const { toasts } = useToast()

  return (
    <View className="relative flex-1">
      <View className="absolute inset-x-0 top-0 z-[9999]">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </View>
      {props.children}
    </View>
  )
}
