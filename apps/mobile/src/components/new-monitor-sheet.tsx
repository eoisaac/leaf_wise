import { NewMonitorForm } from '@/components/new-monitor-form'
import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef,
} from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { MonitorModel } from '@/database/models/monitor-model'
import { actuatorRepository } from '@/database/repositories/actuator-repository'
import { monitorRepository } from '@/database/repositories/monitor-repository'
import { preferencesRepository } from '@/database/repositories/preferences-repository'
import { useMQTT } from '@/hooks/use-mqtt'
import { useToast } from '@/hooks/use-toast'
import { configureMonitorRequest } from '@/services/api/requests/monitor'
import { Wifi } from '@/utils/wifi'
import {
  MONITOR_WIFI_PASSWORD,
  MONITOR_WIFI_SSID,
  MQTT_CLIENT_ID,
  MQTT_HOST,
  MQTT_PORT,
  MQTT_WS_PORT,
} from '@env'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gear } from 'phosphor-react-native'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { neutral } from 'tailwindcss/colors'
import { z } from 'zod'

interface NewMonitorSheetProps extends BottomSheetProps {
  isFirstMonitor?: boolean
}

const NewMonitorSheet = React.forwardRef<BottomSheetRef, NewMonitorSheetProps>(
  ({ isFirstMonitor = false, ...props }, ref) => {
    const [isConfiguring, setIsConfiguring] = React.useState(false)
    const [monitor, setMonitor] = React.useState<MonitorModel | null>(null)
    const [formStep, setFormStep] = React.useState(0)
    const isFirstStep = formStep === 0

    const { showToast } = useToast()
    const mqtt = useMQTT()

    const formSchema = z.object({
      name: z.string().min(3, 'Name must be at least 3 characters'),
      wifiSSID: z.string().min(3, 'SSID must be at least 3 characters'),
      wifiPassword: z.string().min(8, 'Password must be at least 8 characters'),
    })
    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: monitor?.name ?? '',
        wifiSSID: monitor?.wifiSSID ?? '',
        wifiPassword: monitor?.wifiPassword ?? '',
      },
    })

    const handleNextStep = () => setFormStep((prev) => prev + 1)
    const handleResetStep = () => setFormStep(0)

    const handleStoreMonitor = async (values: FormValues) => {
      if (!monitor) {
        const created = await monitorRepository.create(values)
        setMonitor(created)

        await actuatorRepository.create({
          monitorId: created.id,
          name: 'Actuator 1',
          isActive: false,
        })
        await actuatorRepository.create({
          monitorId: created.id,
          name: 'Actuator 2',
          isActive: false,
        })
      } else {
        const updated = await monitorRepository.update(monitor.id, values)
        setMonitor(updated)
      }

      handleNextStep()
    }

    const handleResetSheet = () => {
      form.reset()
      setMonitor(null)
      handleResetStep()

      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.close()
      }
    }

    const handleConfigureMonitor = async () => {
      try {
        setIsConfiguring(true)

        const { connected } = await Wifi.connectToWifi(
          String(MONITOR_WIFI_SSID),
          String(MONITOR_WIFI_PASSWORD),
        )

        if (!connected) {
          return showToast({
            title: 'Connection failed',
            message: 'Could not connect to monitor. Please, try again.',
          })
        }

        const [act0, act1] = await monitor!.getActuators()
        console.log(`Default MQTT host: ${MQTT_HOST}`)

        const preferences = await preferencesRepository.get()
        const DEFAULT_HOST = String(MQTT_HOST)
        const response = await configureMonitorRequest({
          id: monitor!.id,
          wifi: {
            ssid: monitor!.wifiSSID ?? '',
            password: monitor!.wifiPassword ?? '',
          },
          mqtt: {
            host: preferences?.mqttHost ?? DEFAULT_HOST,
            port: Number(MQTT_PORT),
            password: '',
            username: '',
          },
          actuators: { '0': act0.id, '1': act1.id },
        })

        if (response && response.success) {
          monitor?.setSynced()
          isFirstMonitor && monitor?.setSelected()

          if (mqtt.isConnected()) mqtt.disconnect()
          mqtt.connect({
            host: preferences?.mqttHost ?? DEFAULT_HOST,
            port: Number(MQTT_WS_PORT),
            clientId: String(MQTT_CLIENT_ID),
          })

          showToast({
            title: 'Monitor configured',
            message: response.message,
          })

          return handleResetSheet()
        }
      } catch (error) {
        const defaultMsg = 'Could not configure monitor. Please, try again.'
        showToast({
          title: 'Error',
          message: error?.message ?? defaultMsg,
        })
      } finally {
        setIsConfiguring(false)
      }
    }

    return (
      <BottomSheet ref={ref} title="New Monitor" {...props}>
        {isFirstStep ? (
          <View>
            <FormProvider {...form}>
              <NewMonitorForm />
            </FormProvider>
          </View>
        ) : (
          <View className="mb-6 items-center space-y-6">
            <Gear size={48} color={neutral[400]} />
            <Text className="text-center text-base font-normal text-neutral-500 dark:text-neutral-400">
              Please, make sure the monitor&apos;s
              <Text className="text-base font-medium text-amber-500 dark:text-amber-400">
                {' yellow '}
              </Text>
              led is on before proceeding. After that, press the button below to
              configure the monitor.
            </Text>
          </View>
        )}

        <View className="item-center mb-6 mt-4 flex-row space-x-4">
          {isFirstStep && (
            <Button
              variant="ghost2"
              className="flex-1"
              onPress={handleResetSheet}
            >
              Cancel
            </Button>
          )}

          <Button
            className="flex-1"
            loading={isConfiguring}
            disabled={isConfiguring}
            onPress={
              isFirstStep
                ? form.handleSubmit(handleStoreMonitor)
                : handleConfigureMonitor
            }
          >
            {isFirstStep ? 'Next' : 'Configure'}
          </Button>
        </View>
      </BottomSheet>
    )
  },
)

NewMonitorSheet.displayName = 'NewMonitorSheet'

export { NewMonitorSheet }
