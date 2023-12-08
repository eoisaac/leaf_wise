import { mergeTailwind } from '@/utils/tailwind'
import { Text, View } from 'react-native'

interface NotFoundMessageProps {
  message: string
  className?: string
}

export const NotFoundMessage = ({
  message,
  className,
}: NotFoundMessageProps) => {
  return (
    <View
      className={mergeTailwind('items-center justify-center p-4', className)}
    >
      <Text className="text-center text-base font-normal text-neutral-500 dark:text-neutral-400">
        {message}
      </Text>
    </View>
  )
}
