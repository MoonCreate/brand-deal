import { HeroSection } from './components/hero-section'
import { OurFeatureSection } from './components/our-feature-section'
import { ReadyJoinSection } from './components/ready-join-section'
import { WhatTheySaySection } from './components/what-they-say-section'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <OurFeatureSection />
      <WhatTheySaySection />
      <ReadyJoinSection />
    </>
  )
}
