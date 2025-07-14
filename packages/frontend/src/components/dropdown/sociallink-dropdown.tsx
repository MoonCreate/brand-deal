import { useState } from 'react'
import { Button } from '../buttons/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../dropdown/dropdown'
import { cn } from '@/lib/utils'

type SocialLink = {
  key: string // e.g, facebook
  name: string // e.g, Facebook
  logo: string // e.g, https://www.facebook.com/favicon.ico
}

const socialLinks: Array<SocialLink> = [
  {
    key: 'facebook',
    name: 'Facebook',
    logo: 'https://www.facebook.com/favicon.ico',
  },
  {
    key: 'twitter',
    name: 'Twitter',
    logo: 'https://www.twitter.com/favicon.ico',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png',
  },
  {
    key: 'linkedin',
    name: 'Linkedin',
    logo: 'https://www.linkedin.com/favicon.ico',
  },
  {
    key: 'github',
    name: 'Github',
    logo: 'https://www.github.com/favicon.ico',
  },
]

export function SocialLinkDropdown(props: {
  onChangeValue?: (value: string) => unknown
  className?: string
}) {
  const [value, setValue] = useState('')
  const [currentSocial, setCurrentSocial] = useState<SocialLink | null>(null)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn(props.className)}>
          {currentSocial ? (
            <>
              <img
                src={currentSocial.logo}
                className="size-4 object-contain"
                alt={currentSocial.key}
              />
              {currentSocial.name}
            </>
          ) : (
            'Select Social Link'
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup
          value={value}
          // eslint-disable-next-line no-shadow
          onValueChange={(value) => {
            setValue(value)
            props.onChangeValue?.(value)
          }}
        >
          {socialLinks.map((item) => (
            <DropdownMenuRadioItem
              onClick={() => setCurrentSocial(item)}
              key={item.key}
              value={item.key}
            >
              <img
                src={item.logo}
                className="size-4 object-contain"
                alt={item.key}
              />
              {item.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
