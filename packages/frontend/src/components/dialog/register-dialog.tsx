import { Button } from '../buttons/button'
import { RegisterAsBrandDialog } from './register-brand-dialog'
import { RegisterAsContentCreatorDialog } from './register-creator-dialog'
import { dialogInjection } from '@/injection/dialog-injection'

export function RegisterDialog() {
  const dialog = dialogInjection.use()
  return (
    <div className="bg-surface-1 p-6 rounded-xl">
      <h2 className="text-9xl font-karantina">REGISTER</h2>
      <div className="bg-blacked h-px my-4"></div>
      <div className="flex gap-6">
        <Button
          className="text-2xl"
          onClick={() => {
            dialog.open(<RegisterAsBrandDialog />)
          }}
        >
          REGISTER AS BRAND
        </Button>
        <Button
          className="text-2xl"
          onClick={() => {
            dialog.open(<RegisterAsContentCreatorDialog />)
          }}
        >
          REGISTER AS CONTENT CREATOR
        </Button>
      </div>
    </div>
  )
}
