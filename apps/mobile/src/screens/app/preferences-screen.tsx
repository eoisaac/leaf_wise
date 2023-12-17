import { AllMonitorsScreenProps } from '@/@types/routes'
import { ConfirmSheet } from '@/components/confirm-sheet'
import { StackScreen } from '@/components/layouts/stack-screen'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMonitor } from '@/contexts/monitor-context'
import { preferencesRepository } from '@/database/repositories/preferences-repository'
import { watermelonDB } from '@/database/watermelon'
import { useMQTT } from '@/hooks/use-mqtt'
import { MQTT_CLIENT_ID, MQTT_HOST, MQTT_WS_PORT } from '@env'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'

export const PreferencesScreen = ({ navigation }: AllMonitorsScreenProps) => {
  const { ref, open } = useBottomSheet()
  const { flushMonitors } = useMonitor()

  const mqtt = useMQTT()

  const formSchema = z.object({
    mqttHost: z.string().min(3, 'Host must be at least 3 characters'),
  })
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const preferences = await preferencesRepository.get()
      return { mqttHost: preferences?.mqttHost ?? String(MQTT_HOST) }
    },
  })
  const { errors } = form.formState

  const handleSubmit = async (values: FormValues) => {
    await preferencesRepository.set({ mqttHost: values.mqttHost })

    if (mqtt.isConnected()) mqtt.disconnect()
    mqtt.connect({
      host: values.mqttHost,
      port: Number(MQTT_WS_PORT),
      clientId: String(MQTT_CLIENT_ID),
    })
  }

  const handleOpenConfirmSheet = () => open()

  const flushDB = async () => {
    await watermelonDB.write(async () => {
      await watermelonDB.unsafeResetDatabase()
      flushMonitors()
    })
  }

  return (
    <>
      <StackScreen navigation={navigation} name="Preferences">
        <View className="flex-1 justify-between">
          <View className="space-y-2">
            <Controller
              control={form.control}
              name="mqttHost"
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <View className="space-y-1">
                    <Text className="ml-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
                      MQTT Host
                    </Text>
                    <Input
                      placeholder="MQTT Host"
                      autoCapitalize="none"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                    <Text className="ml-2 text-xs text-rose-500 dark:text-rose-400">
                      {String(errors.mqttHost?.message ?? '')}
                    </Text>
                  </View>
                )
              }}
            />

            <Button
              className="w-full"
              variant="secondary"
              onPress={form.handleSubmit(handleSubmit)}
            >
              Save
            </Button>
          </View>

          <Button
            className="w-full"
            variant="danger"
            onPress={handleOpenConfirmSheet}
          >
            Flush database
          </Button>
        </View>
      </StackScreen>

      <ConfirmSheet
        ref={ref}
        title="Flush database"
        description="Are you sure you want to flush the database? This action cannot be undone."
        onConfirm={flushDB}
        danger
      />
    </>
  )
}
