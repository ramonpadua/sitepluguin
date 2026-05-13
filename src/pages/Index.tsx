import { HeroSection6 } from '@/components/ui/hero-section-6'
import { Differentials } from '@/components/Differentials'
import { Portfolio } from '@/components/Portfolio'
import { FloatingChat } from '@/components/FloatingChat'

const Index = () => {
  return (
    <div className="w-full bg-background">
      <HeroSection6 />
      <Differentials />
      <Portfolio />
      <FloatingChat />
    </div>
  )
}

export default Index
