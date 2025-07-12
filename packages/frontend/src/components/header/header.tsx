import { motion } from 'motion/react'
import { ConnectButton } from '../buttons/connect-button'
import { Navbar } from '../navbar/navbar'

export default function Header() {
  return (
    <motion.header
      animate={{ y: ['100%', '0%'] }}
      className="p-6 flex justify-between items-center"
    >
      <h1 className="text-4xl font-karantina">BRAND DEAL</h1>
      <Navbar />
      <ConnectButton />
    </motion.header>
  )
}
