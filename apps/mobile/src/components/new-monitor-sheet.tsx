import { NewMonitorForm } from '@/components/new-monitor-form'
import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef,
} from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { ActuatorModel } from '@/database/models/actuator-model'
import { MonitorModel } from '@/database/models/monitor-model'
import { actuatorRepository } from '@/database/repositories/actuator-repository'
import { monitorRepository } from '@/database/repositories/monitor-repository'
import { configureMonitorRequest } from '@/services/api/requests/monitor'
import { Wifi } from '@/utils/wifi'
import {
  MONITOR_WIFI_PASSWORD,
  MONITOR_WIFI_SSID,
  MQTT_HOST,
  MQTT_PORT,
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
  ({ ...props }, ref) => {
    const [isConfiguring, setIsConfiguring] = React.useState(false)
    const [newMonitor, setNewMonitor] = React.useState<MonitorModel | null>(
      null,
    )
    const [actuators, setActuators] = React.useState<ActuatorModel[]>([])

    const [formStep, setFormStep] = React.useState(0)
    const isFirstStep = formStep === 0

    const formSchema = z.object({
      name: z.string().min(3, 'Name must be at least 3 characters'),
      wifiSSID: z.string().min(3, 'SSID must be at least 3 characters'),
      wifiPassword: z.string().min(8, 'Password must be at least 8 characters'),
    })
    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: newMonitor?.name ?? '',
        wifiSSID: newMonitor?.wifiSSID ?? '',
        wifiPassword: newMonitor?.wifiPassword ?? '',
      },
    })

    const handleNextStep = () => setFormStep((prev) => prev + 1)
    const handleResetStep = () => setFormStep(0)

    const handleStoreMonitor = async (values: FormValues) => {
      if (!newMonitor) {
        const created = await monitorRepository.create({
          ...values,
        })
        setNewMonitor(created)

        const actuator1 = await actuatorRepository.create({
          monitorId: created.id,
          name: 'Actuator 1',
        })
        const actuator2 = await actuatorRepository.create({
          monitorId: created.id,
          name: 'Actuator 2',
        })
        setActuators([actuator1, actuator2])
      } else {
        const updated = await monitorRepository.update(newMonitor.id, values)
        setNewMonitor(updated)
      }

      handleNextStep()
    }

    const handleConfigureMonitor = async () => {
      try {
        setIsConfiguring(true)

        const { connected } = await Wifi.connectToWifi(
          String(MONITOR_WIFI_SSID),
          String(MONITOR_WIFI_PASSWORD),
        )

        if (!connected) {
          console.log('not connected')
          return
        }

        const response = await configureMonitorRequest({
          id: newMonitor!.id,
          wifi: {
            ssid: newMonitor!.wifiSSID ?? '',
            password: newMonitor!.wifiPassword ?? '',
          },
          mqtt: {
            host: String(MQTT_HOST),
            port: Number(MQTT_PORT),
            password: '',
            username: '',
          },
          actuators: { '0': actuators[0].id, '1': actuators[1].id },
        })

        newMonitor?.setSelected(true)

        console.log('response sheet', response)
      } catch (error) {
        console.log('error sheet', error)
      } finally {
        setIsConfiguring(false)
      }
    }

    const handleCancel = () => {
      form.reset()
      setNewMonitor(null)
      handleResetStep()

      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.close()
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
            <Button variant="ghost2" className="flex-1" onPress={handleCancel}>
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
