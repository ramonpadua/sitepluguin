import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function Portfolio() {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  const handleImageLoad = (id: number) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }))
  }

  const projects = [
    { id: 1, title: 'Longa Metragem', category: 'Mixagem 5.1', query: 'cinema' },
    { id: 2, title: 'Série de Streaming', category: 'Sound Design', query: 'tv%20series' },
    { id: 3, title: 'Campanha Publicitária', category: 'Trilha Original', query: 'commercial' },
    { id: 4, title: 'Documentário', category: 'Edição de Diálogos', query: 'documentary' },
  ]

  return (
    <section id="portfolio" className="py-24 bg-card/30 border-y border-border/50 relative z-10">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Trabalhos Recentes</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Uma seleção de projetos onde o áudio foi peça fundamental para o sucesso da obra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl aspect-video bg-muted cursor-pointer"
            >
              {!imagesLoaded[project.id] && <Skeleton className="absolute inset-0 w-full h-full" />}
              <img
                src={`https://img.usecurling.com/p/800/450?q=${project.query}&color=black`}
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  imagesLoaded[project.id] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(project.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-medium text-sm tracking-wider uppercase mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
