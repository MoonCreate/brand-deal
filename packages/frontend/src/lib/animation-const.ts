import type { TargetAndTransition } from 'motion/react'

export const bop = {
  scale: [0, 1],
  rotate: [60, 0],
} as const satisfies TargetAndTransition

export const bop2 = {
  scale: [0, 1],
  rotate: [30, 0],
} as const satisfies TargetAndTransition

// 1. Bounce In - Untuk card yang muncul dengan efek bouncy
export const bounceIn = {
  scale: [0, 1.1, 1],
  opacity: [0, 0.8, 1],
  transition: {
    duration: 0.6,
    ease: 'easeOut',
  },
} as const satisfies TargetAndTransition

// 2. Slide Up - Untuk elemen yang naik dari bawah
export const slideUp = {
  y: [100, 0],
  opacity: [0, 1],
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
} as const satisfies TargetAndTransition

// 3. Fade Slide Right - Kombinasi fade dan slide dari kiri
export const fadeSlideRight = {
  x: [-50, 0],
  opacity: [0, 1],
  transition: {
    duration: 0.5,
    ease: 'easeInOut',
  },
} as const satisfies TargetAndTransition

// 4. Flip Card - Untuk efek kartu yang berputar
export const flipCard = {
  rotateY: [90, 0],
  opacity: [0, 1],
  transition: {
    duration: 0.8,
    ease: 'easeOut',
  },
} as const satisfies TargetAndTransition

// 5. Pulse Scale - Efek denyut untuk button atau highlight
export const pulseScale = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'easeInOut',
  },
} as const satisfies TargetAndTransition

// 6. Zoom Rotate - Kombinasi zoom dan rotasi halus
export const zoomRotate = {
  scale: [0.8, 1],
  rotate: [-10, 0],
  opacity: [0, 1],
  transition: {
    duration: 0.6,
    ease: 'backOut',
  },
} as const satisfies TargetAndTransition

// 7. Elastic Pop - Efek elastis untuk modal atau popup
export const elasticPop = {
  scale: [0, 1.2, 0.9, 1],
  transition: {
    duration: 0.8,
    ease: 'easeOut',
  },
} as const satisfies TargetAndTransition

// 8. Slide Down Fade - Elemen turun dari atas dengan fade
export const slideDownFade = {
  y: [-80, 0],
  opacity: [0, 1],
  transition: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
  },
} as const satisfies TargetAndTransition

// 9. Wiggle Entry - Efek goyang untuk menarik perhatian
export const wiggleEntry = {
  x: [0, -10, 10, -5, 5, 0],
  scale: [0.9, 1],
  opacity: [0, 1],
  transition: {
    duration: 0.8,
    ease: 'easeOut',
  },
} as const satisfies TargetAndTransition

// 10. Spiral In - Efek spiral masuk yang unik
export const spiralIn = {
  scale: [0, 1],
  rotate: [180, 0],
  opacity: [0, 1],
  transition: {
    duration: 1,
    ease: 'easeInOut',
  },
} as const satisfies TargetAndTransition

// Bonus: Stagger Container - Untuk animasi berurutan
export const staggerContainer = {
  transition: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },
} as const satisfies TargetAndTransition

// Bonus: Stagger Item - Item yang akan di-stagger
export const staggerItem = {
  y: [20, 0],
  opacity: [0, 1],
  transition: {
    duration: 0.5,
  },
} as const satisfies TargetAndTransition
