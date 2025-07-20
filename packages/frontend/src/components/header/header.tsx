import { motion } from 'motion/react'
import { ConnectButton } from '../buttons/connect-button'
import { Navbar } from '../navbar/navbar'
import { RegisterButton } from '../buttons/register-button'

export default function Header() {
  return (
    <motion.header
      animate={{ y: ['100%', '0%'] }}
      className="p-6 flex justify-between items-center"
    >
      <h1 className="text-4xl font-karantina">Kollabora</h1>
      <Navbar />
      <div className="flex gap-2">
        <ConnectButton />
        <RegisterButton />
      </div>
    </motion.header>
  )
}
