import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeTailwind = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
