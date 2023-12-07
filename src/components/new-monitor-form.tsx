import { Controller, useFormContext } from 'react-hook-form'
import { Text, View } from 'react-native'

import { Input } from '@/components/ui/input'

export const NewMonitorForm = () => {
  const form = useFormContext()
  const { errors } = form.formState

  return (
    <View className="space-y-4">
      <Controller
        control={form.control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View className="gap-0.5">
              <Text>Monitor name</Text>
              <Input
                placeholder="Monitor name"
                autoCapitalize="none"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              <Text>{String(errors.name?.message ?? '')}</Text>
            </View>
          )
        }}
      />

      <Controller
        control={form.control}
        name="wifiSsid"
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View className="gap-0.5">
              <Text>Wifi SSID</Text>
              <Input
                placeholder="Wifi SSID"
                autoCapitalize="none"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              <Text>{String(errors.wifiSsid?.message ?? '')}</Text>
            </View>
          )
        }}
      />
      <Controller
        control={form.control}
        name="wifiPassword"
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View className="gap-0.5">
              <Text>Wifi Password</Text>
              <Input
                placeholder="Wifi Password"
                autoCapitalize="none"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
              />
              <Text>{String(errors.wifiPassword?.message ?? '')}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}
