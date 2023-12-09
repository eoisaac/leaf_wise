import { LoadingIndicator } from '@/components/ui/loading-indicator'
import { mergeTailwind } from '@/utils/tailwind'
import { VariantProps, cva } from 'cva'
import { useColorScheme } from 'nativewind'
import { IconContext } from 'phosphor-react-native'
import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { lime, neutral } from 'tailwindcss/colors'

const buttonVariants = cva(
  'rounded-2xl flex-row items-center justify-center border-2 space-x-2',
  {
    variants: {
      variant: {
        primary: `bg-lime-400 dark:bg-lime-500 border-transparent
        active:bg-lime-500/80 dark:active:bg-lime-500/90`,
        secondary: `border-transparent bg-neutral-200 dark:bg-neutral-900
        active:bg-neutral-300 dark:active:bg-neutral-800`,
        outline: `bg-transparent border-lime-400 dark:border-lime-500
        dark:active:bg-lime-500/10 active:bg-lime-400/10`,
        link: `bg-transparent border-transparent active:bg-lime-500/10
        dark:active:bg-lime-500/10`,
        ghost: `bg-transparent border-transparent active:bg-lime-500/10`,
        ghost2: `bg-transparent border-transparent active:bg-neutral-200
        dark:active:bg-neutral-800`,
        danger: `bg-red-500 border-transparent active:bg-red-600/80`,
      },
      size: {
        default: 'py-3 px-4',
        sm: 'px-2 py-1',
        icon: 'p-3 gap-0 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

const buttonTextVariants = cva('text-xl font-medium', {
  variants: {
    variant: {
      primary: 'text-neutral-50 dark:text-neutral-100',
      secondary: 'text-neutral-600 dark:text-neutral-300',
      outline: 'text-lime-400 dark:text-lime-500',
      link: 'text-lime-400 dark:text-lime-500 underline',
      ghost: 'text-lime-400 dark:text-lime-500',
      ghost2: 'text-neutral-500',
      danger: 'text-red-50',
    },
    size: {
      default: 'text-base',
      sm: 'text-lg',
      lg: 'text-2xl',
      icon: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

const getButtonIconColor = (isDark: boolean, variant: string) => {
  const textColors = {
    primary: isDark ? neutral[100] : neutral[50],
    secondary: isDark ? neutral[300] : neutral[500],
    outline: isDark ? lime[500] : lime[400],
    link: isDark ? lime[500] : lime[400],
    ghost: isDark ? lime[500] : lime[400],
    ghost2: neutral[400],
  }

  return textColors[variant]
}

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  icon?: JSX.Element
  loading?: boolean
  textClassName?: string
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      loading = false,
      className,
      textClassName,
      activeOpacity = 1,
      ...props
    },
    ref,
  ) => {
    const { colorScheme } = useColorScheme()

    const isDark = colorScheme === 'dark'
    const iconColor = getButtonIconColor(isDark, variant)

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={activeOpacity}
        className={mergeTailwind(buttonVariants({ variant, size, className }), {
          'bg-opacity-70': props.disabled,
        })}
        {...props}
      >
        <IconContext.Provider value={{ size: 22, color: iconColor }}>
          {loading ? (
            <LoadingIndicator size="small" color={iconColor} />
          ) : (
            props.icon
          )}
        </IconContext.Provider>
        <Text
          className={mergeTailwind(
            buttonTextVariants({ variant, size, className: textClassName }),
          )}
        >
          {props.children}
        </Text>
      </TouchableOpacity>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
