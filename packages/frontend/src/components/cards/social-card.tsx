import { motion } from 'motion/react'
import { socialLinks } from '../dropdown/sociallink-dropdown'
import type { Brand } from '@/types'

export function SocialCard(props: {
  social: Brand['metadata']['attributes'][4]['value']
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {props.social.map((item, index) => {
        const data = socialLinks[item.type as keyof typeof socialLinks]
        return (
          <motion.a
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: index * 0.1 }}
            href={item.link}
            target="_blank"
            key={index}
          >
            <img className="size-4" src={data.logo} alt={data.key} />
          </motion.a>
        )
      })}
    </div>
  )
}
