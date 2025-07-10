import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import { ConnectButton } from '../buttons/connect-button'
import { getButtonStyle } from '../buttons/button'

const defaultStyle = getButtonStyle()

const lists = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/campaign',
    label: 'Campaign',
  },
  {
    to: '/dashboard',
    label: 'Dashboard',
  },
] as const

export default function Header() {
  const router = useRouterState()
  return (
    <header className="p-6 flex justify-between items-center">
      <h1 className="text-4xl font-karantina">BRAND DEAL</h1>
      <nav className="flex gap-5 items-center">
        {lists.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            children={item.label}
            className={
              router.location.pathname == item.to
                ? defaultStyle
                : 'font-semibold'
            }
          />
        ))}
      </nav>
      <ConnectButton />
    </header>
  )
}
