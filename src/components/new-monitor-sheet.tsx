import { NewMonitorForm } from '@/components/new-monitor-form'
import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef,
} from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const NewMonitorSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ ...props }, ref) => {
    const formSchema = z.object({
      name: z.string(),
      wifiSsid: z.string(),
      wifiPassword: z.string(),
      // name: z.string().min(3, 'Name must be at least 3 characters'),
      // wifiSsid: z.string().min(3, 'SSID must be at least 3 characters'),
      // wifiPassword: z.string().min(8, 'Password must be at least 8 characters'),
    })
    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        wifiSsid: '',
        wifiPassword: '',
      },
    })

    return (
      <BottomSheet ref={ref} {...props}>
        <FormProvider {...form}>
          <NewMonitorForm />
        </FormProvider>

        <View className="item-center flex-row gap-4">
          <Button variant="ghost2" className="flex-1">
            {/* {isFirstStep ? 'Cancel' : 'Back'} */}
            Cancel
          </Button>
          <Button
            className="flex-1"
            // onPress={form.handleSubmit(handleFormSubmit)}
          >
            {/* {isFirstStep ? 'Next' : 'Create'} */}
            Create
          </Button>
        </View>
      </BottomSheet>
    )
  },
)

NewMonitorSheet.displayName = 'NewMonitorSheet'

export { NewMonitorSheet }
