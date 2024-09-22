'use client';  // Add this line at the top of the file

import { useState, useEffect } from 'react'

export interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => {
          if (toast.duration === undefined) return true
          return Date.now() - new Date(toast.id).getTime() < toast.duration
        })
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function toast({ title, description = '', duration = 3000 }: Omit<Toast, 'id'>) {
    const id = Date.now().toString()
    setToasts((prevToasts) => [...prevToasts, { id, title, description, duration }])
  }

  return { toast, toasts }
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
        >
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
        </div>
      ))}
    </div>
  )
}