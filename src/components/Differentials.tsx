import { Music, Volume2, FileCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const features = [
  {
    id: 1,
    title: 'Trilha Original',
    description:
      'Supervisão musical e criação de trilha sonora original sob medida para amplificar a emoção da sua narrativa.',
    icon: Music,
  },
  {
    id: 2,
    title: 'Pós-Produção',
    description:
      'Sound design detalhado, edição de diálogos cristalina e mixagem imersiva em formatos 5.1 e Dolby Atmos.',
    icon: Volume2,
  },
  {
    id: 3,
    title: 'Entrega Técnica',
    description:
      'Garantia de conformidade com as rigorosas especificações de TV, cinema e das principais plataformas de streaming.',
    icon: FileCheck,
  },
]

export function Differentials() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-background relative z-10">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Excelência em cada etapa do áudio
          </h2>
          <p className="text-muted-foreground text-lg">
            Um ecossistema completo para garantir que o áudio da sua produção atinja o mais alto
            nível de qualidade e impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.id}
                className="group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)]"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground/90 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
