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
  {
    to: '/profile',
    label: 'Profile',
  },
] as const

export function Navbar() {
  const router = useRouterState()
  return (
    <nav className="flex gap-5 items-center">
      {lists.map((item) => {
        const pathname = router.location.pathname
        let isOnThisRoute = item.to == pathname
        if (item.to.length > 1) isOnThisRoute = pathname.startsWith(item.to)
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
