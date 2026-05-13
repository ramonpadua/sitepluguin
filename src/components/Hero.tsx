import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Slight delay for content to animate in smoothly
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image with Skeleton state */}
      <div className="absolute inset-0 z-0 bg-background">
        {!imageLoaded && (
          <Skeleton className="w-full h-full absolute inset-0 rounded-none animate-pulse" />
        )}
        <img
          src="https://img.usecurling.com/p/1920/1080?q=mixing%20console&color=black"
          alt="Estúdio de Áudio Profissional"
          className={cn(
            'w-full h-full object-cover object-center transition-opacity duration-1000',
            imageLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center max-w-4xl px-4 md:px-6">
        {showContent && (
          <>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
              Estúdio de Áudio Profissional
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up opacity-0 [animation-fill-mode:forwards] delay-100 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              O som define o impacto da obra
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in-up opacity-0 [animation-fill-mode:forwards] delay-200 leading-relaxed">
              Na Plugin, criação, pós-produção e entrega técnica acontecem no mesmo fluxo. Cada
              projeto sai com sua intenção artística intacta e pronto para qualquer plataforma.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up opacity-0 [animation-fill-mode:forwards] delay-300">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-semibold w-full sm:w-auto hover:scale-105 transition-transform duration-200"
                asChild
              >
                <a href="#portfolio">Ver Portfólio</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold w-full sm:w-auto hover:scale-105 transition-transform duration-200 hover:bg-white/5"
                asChild
              >
                <a href="#contato">Fale Conosco</a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
