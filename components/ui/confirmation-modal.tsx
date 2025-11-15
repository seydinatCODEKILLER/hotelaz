'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Trash2, RotateCcw, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ConfirmationType = 'delete' | 'restore' | 'info'

interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description: string
  type?: ConfirmationType
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

const getIcon = (type: ConfirmationType) => {
  switch (type) {
    case 'delete':
      return <Trash2 className="w-6 h-6" />
    case 'restore':
      return <RotateCcw className="w-6 h-6" />
    case 'info':
      return <Info className="w-6 h-6" />
    default:
      return <AlertTriangle className="w-6 h-6" />
  }
}

const getButtonVariant = (type: ConfirmationType) => {
  switch (type) {
    case 'delete':
      return 'destructive'
    case 'restore':
      return 'default'
    case 'info':
      return 'default'
    default:
      return 'default'
  }
}

const getIconContainerClass = (type: ConfirmationType) => {
  switch (type) {
    case 'delete':
      return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
    case 'restore':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
    case 'info':
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
    default:
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
  }
}

export function ConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  type = 'info',
  confirmText,
  cancelText = 'Annuler',
  isLoading = false,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const defaultConfirmText = {
    delete: 'Supprimer',
    restore: 'Restaurer',
    info: 'Confirmer'
  }[type]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-full', getIconContainerClass(type))}>
              {getIcon(type)}
            </div>
            <div>
              <DialogTitle className="text-left">{title}</DialogTitle>
              <DialogDescription className="text-left mt-2">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="sm:flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant={getButtonVariant(type)}
            onClick={handleConfirm}
            disabled={isLoading}
            className="sm:flex-1"
          >
            {isLoading ? 'Chargement...' : (confirmText || defaultConfirmText)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}