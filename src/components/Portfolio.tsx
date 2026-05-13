import { PortfolioGrid } from '@/components/ui/portfolio-grid'

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-card/30 border-y border-border/50 relative z-10">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Trabalhos Recentes</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Uma seleção de projetos onde o áudio foi peça fundamental para o sucesso da obra.
          </p>
        </div>

        <PortfolioGrid />
      </div>
    </section>
  )
}
