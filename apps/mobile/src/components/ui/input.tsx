import { mergeTailwind } from '@/utils/tailwind'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { neutral } from 'tailwindcss/colors'

interface InputProps extends TextInputProps {}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, ...props }: InputProps, ref) => {
    const { colorScheme } = useColorScheme()

    const placeholderTextColor =
      colorScheme === 'dark' ? neutral[500] : neutral[400]

    return (
      <TextInput
        ref={ref}
        className={mergeTailwind(
          `rounded-2xl border-2 border-solid border-neutral-200 bg-neutral-100
          px-4 py-3 text-base text-neutral-900 focus:border-lime-400 dark:border-neutral-800
          dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-lime-500`,
          className,
        )}
        placeholderTextColor={placeholderTextColor}
        // placeholderClassName="text-neutral-400 dark:text-neutral-500"
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
