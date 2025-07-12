import { Link, useRouterState } from '@tanstack/react-router'
import { motion } from 'motion/react'
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

export function Navbar() {
  const router = useRouterState()
  return (
    <nav className="flex gap-5 items-center">
      {lists.map((item) => {
        const isOnThisRoute = router.location.pathname == item.to
        return isOnThisRoute ? (
          <motion.div key={item.to} layoutId="nav-active" layout>
            <Link to={item.to} children={item.label} className={defaultStyle} />
          </motion.div>
        ) : (
          <Link
            key={item.to}
            to={item.to}
            children={item.label}
            className={'font-semibold'}
          />
        )
      })}
    </nav>
  )
}
