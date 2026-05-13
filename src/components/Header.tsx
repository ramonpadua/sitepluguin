import { useState, useEffect } from 'react'
import { Menu, AudioLines } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Portfólio', href: '#portfolio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Contato', href: '#contato' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Simplistic scroll spy for active link highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
        >
          <AudioLines className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight text-foreground">Plugin</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeHash === link.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button size="sm" asChild>
            <a href="#contato">Fale Conosco</a>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-background/95 backdrop-blur-lg border-l-border/50"
            >
              <SheetHeader className="mb-8">
                <SheetTitle className="flex items-center gap-2 text-primary">
                  <AudioLines className="w-6 h-6" />
                  Plugin
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="mt-4 w-full" asChild>
                  <a href="#contato">Fale Conosco</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
