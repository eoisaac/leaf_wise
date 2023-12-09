import { BaseToastProps } from '@/components/ui/toast'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'

interface ToastProps extends BaseToastProps {
  id: string
}

interface ToastStore {
  toasts: ToastProps[]
  showToast: (toast: BaseToastProps) => void
  hideToast: (id: string) => void
}

export const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],
  showToast: (toast) => {
    const newToast = { ...toast, id: uuidv4() }
    return set((state) => ({ toasts: [...state.toasts, newToast] }))
  },
  hideToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}))
