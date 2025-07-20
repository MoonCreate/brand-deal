import { LucideArrowUp } from 'lucide-react'
import { RegisterDialog } from '../dialog/register-dialog'
import { Button } from './button'
import { useGetProfile } from '@/hooks/use-get-profile'
import { dialogInjection } from '@/injection/dialog-injection'

export function RegisterButton() {
  const { data: accountInfo, isLoading, isPending } = useGetProfile()
  const dialog = dialogInjection.use()

  return (
    !accountInfo &&
    !isLoading &&
    !isPending && (
      <Button onClick={() => dialog.open(<RegisterDialog />)}>
        <LucideArrowUp className="size-4" strokeWidth={3} />
        Register
      </Button>
    )
  )
}
