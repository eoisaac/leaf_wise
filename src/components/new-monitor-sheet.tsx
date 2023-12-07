import { NewMonitorForm } from '@/components/new-monitor-form'
import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef,
} from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { MonitorModel } from '@/database/models/monitor-model'
import { monitorRepository } from '@/database/repositories/monitor-repository'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated'
import { z } from 'zod'

const NewMonitorSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ ...props }, ref) => {
    const [newMonitor, setNewMonitor] = React.useState<MonitorModel | null>(
      null,
    )
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
    const handlePrevStep = () => setFormStep((prev) => prev - 1)
    const handleResetStep = () => setFormStep(0)

    const handleStoreMonitor = async (values: FormValues) => {
      if (!newMonitor) {
        const created = await monitorRepository.create(values)
        setNewMonitor(created)
      } else {
        const updated = await monitorRepository.update(newMonitor.id, values)
        setNewMonitor(updated)
      }

      handleNextStep()
    }

    const handleConfigureMonitor = async () => {
      console.log('configuring monitor...')
    }

    const handleCancel = () => {
      form.reset()
      handleResetStep()

      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.close()
      }
    }

    return (
      <BottomSheet ref={ref} title="New Monitor" {...props}>
        {isFirstStep ? (
          <Animated.View entering={SlideInRight} exiting={SlideInLeft}>
            <FormProvider {...form}>
              <NewMonitorForm />
            </FormProvider>
          </Animated.View>
        ) : (
          <Animated.View entering={SlideInRight} exiting={SlideInLeft}>
            <Text className="text-neutral-50">{newMonitor?.id}</Text>
            <Text className="text-neutral-50">{newMonitor?.name}</Text>
            <Text className="text-neutral-50">{newMonitor?.wifiSSID}</Text>
            <Text className="text-neutral-50">{newMonitor?.wifiPassword}</Text>
          </Animated.View>
        )}

        <View className="item-center mb-6 mt-4 flex-row space-x-4">
          <Button
            variant="ghost2"
            className="flex-1"
            onPress={isFirstStep ? handleCancel : handlePrevStep}
          >
            {isFirstStep ? 'Cancel' : 'Back'}
          </Button>
          <Button
            className="flex-1"
            onPress={
              isFirstStep
                ? form.handleSubmit(handleStoreMonitor)
                : handleConfigureMonitor
            }
          >
            {isFirstStep ? 'Next' : 'Create'}
          </Button>
        </View>
      </BottomSheet>
    )
  },
)

NewMonitorSheet.displayName = 'NewMonitorSheet'

export { NewMonitorSheet }
