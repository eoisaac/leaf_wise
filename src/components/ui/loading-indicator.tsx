import { useColorScheme } from 'nativewind'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { lime } from 'tailwindcss/colors'

export const LoadingIndicator = ({
  color,
  size = 'large',
  className,
  ...props
}: ActivityIndicatorProps) => {
  const { colorScheme } = useColorScheme()
  const defaultColor = colorScheme === 'dark' ? lime[500] : lime[400]

  return (
    <ActivityIndicator
      color={color ?? defaultColor}
      size={size}
      {...props}
      className={className}
    />
  )
}
