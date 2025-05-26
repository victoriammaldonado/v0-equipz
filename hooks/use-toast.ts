// Elimina la importación circular y simplifica el archivo
"use client"

import { useToast as useToastImported, toast as toastImported } from "@/components/ui/use-toast"

export const toast = toastImported
export const useToast = useToastImported
