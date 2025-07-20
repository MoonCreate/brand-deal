import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number) {
  if (num >= 1_000_000_000) {
    return (
      (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + 'B'
    )
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + 'M'
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + 'K'
  } else {
    return num.toString()
  }
}

export function createIPFSGatewayURL(cid: string) {
  return `${import.meta.env.VITE_IPFS_CID}/${cid}`
}

export function createBlockExplorerLink(link: string) {
  return `https://sepolia-blockscout.lisk.com/tx/${link}`
}
