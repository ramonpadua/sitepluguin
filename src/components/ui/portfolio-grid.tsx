import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Filter, XCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProjectFormat = 'Filme' | 'Série' | 'Documentário' | 'Reality'

interface Project {
  id: string
  title: string
  format: ProjectFormat
  description: string
  image: string
}

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Noites de Neon',
    format: 'Filme',
    description: 'Trilha original para thriller urbano com 45 minutos de música original',
    image: 'https://img.usecurling.com/p/800/450?q=audio%20studio&color=purple',
  },
  {
    id: '2',
    title: 'Série Verão',
    format: 'Série',
    description: 'Pós-produção completa de 8 episódios com sound design imersivo',
    image: 'https://img.usecurling.com/p/800/450?q=sound%20design&color=orange',
  },
  {
    id: '3',
    title: 'Amazônia Selvagem',
    format: 'Documentário',
    description: 'Trilha e sound design para documentário de natureza em 4K',
    image: 'https://img.usecurling.com/p/800/450?q=recording%20studio&color=green',
  },
  {
    id: '4',
    title: 'Realidade Extrema',
    format: 'Reality',
    description: 'Edição de áudio e mixagem para reality show de 12 episódios',
    image: 'https://img.usecurling.com/p/800/450?q=mixing%20console&color=red',
  },
  {
    id: '5',
    title: 'Última Chance',
    format: 'Filme',
    description: 'Mixagem em Dolby Atmos para drama independente',
    image: 'https://img.usecurling.com/p/800/450?q=dolby%20atmos&color=gray',
  },
]

type FilterType = 'Todos' | 'Filmes' | 'Séries' | 'Documentários' | 'Reality'

const FILTER_MAP: Record<FilterType, ProjectFormat | 'Todos'> = {
  Todos: 'Todos',
  Filmes: 'Filme',
  Séries: 'Série',
  Documentários: 'Documentário',
  Reality: 'Reality',
}

export function PortfolioGrid() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos')

  const fetchProjects = () => {
    setStatus('loading')

    // Simulate network request
    setTimeout(() => {
      setProjects(MOCK_PROJECTS)
      setStatus('success')
    }, 1500)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleFilterChange = (filter: FilterType) => {
    if (filter === activeFilter) return
    setActiveFilter(filter)
  }

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return projects
    return projects.filter((p) => p.format === FILTER_MAP[activeFilter])
  }, [projects, activeFilter])

  const filters: FilterType[] = ['Todos', 'Filmes', 'Séries', 'Documentários', 'Reality']

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <div className="flex items-center text-muted-foreground mr-2">
          <Filter className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Filtrar:</span>
        </div>
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'outline'}
            onClick={() => handleFilterChange(filter)}
            className="rounded-full transition-all duration-300"
            disabled={status === 'loading' || status === 'error'}
          >
            {filter}
          </Button>
        ))}
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-4">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in-up">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-xl font-bold mb-2">Erro ao carregar projetos</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Houve um problema ao conectar com o servidor. Por favor, tente novamente.
          </p>
          <Button onClick={fetchProjects}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      )}

      {status === 'success' && filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in-up">
          <XCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-bold mb-2">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground">
            Não há projetos disponíveis com o filtro "{activeFilter}" no momento.
          </p>
        </div>
      )}

      {status === 'success' && filteredProjects.length > 0 && (
        <div
          key={activeFilter}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in duration-500"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col group rounded-xl overflow-hidden border bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={`Thumbnail de ${project.title}`}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                  {project.format}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-grow">
                  {project.description}
                </p>
                <a
                  href={`#projeto-${project.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                >
                  Ver Projeto
                  <svg
                    className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
