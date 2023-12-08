import { AllMonitorsScreenProps } from '@/@types/routes'
import { ConfirmSheet } from '@/components/confirm-sheet'
import { StackScreen } from '@/components/layouts/stack-screen'
import { useBottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { watermelonDB } from '@/database/watermelon'
import { View } from 'react-native'

export const PreferencesScreen = ({ navigation }: AllMonitorsScreenProps) => {
  const { ref, open } = useBottomSheet()

  const handleOpenConfirmSheet = () => open()

  const flushDB = async () => {
    await watermelonDB.write(async () => {
      await watermelonDB.unsafeResetDatabase()
    })
  }

  return (
    <>
      <StackScreen navigation={navigation} name="Preferences">
        <View className="flex-1 justify-end">
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
