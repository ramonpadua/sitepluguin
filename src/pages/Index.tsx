import { Hero } from '@/components/Hero'
import { Differentials } from '@/components/Differentials'
import { Portfolio } from '@/components/Portfolio'

const Index = () => {
  return (
    <div className="w-full bg-background">
      <Hero />
      <Differentials />
      <Portfolio />
    </div>
  )
}

export default Index
