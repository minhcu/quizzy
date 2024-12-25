import { useToast } from '~/components/ui/toast'

export function notifyError(message: string) {
  const toast = useToast()

  toast.toast({
    variant: 'destructive',
    title: 'An error occurred.',
    description: message || 'Something went wrong.',
  })
}

export function notifySuccess(message: string) {
  const toast = useToast()

  toast.toast({
    variant: 'success',
    title: 'Success!',
    description: message || 'Operation was successful.',
  })
}

export function notifyUnderConstruction() {
  const toast = useToast()

  toast.toast({
    title: 'Under construction',
    description: 'This feature is under construction.',
  })
}
