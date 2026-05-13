import { useState } from 'react'
import { Menu, X, ArrowRight, Mail, SendHorizonal, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function HeroSection6() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative w-full bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
              <path
                d="M10 16L14 20L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold">Plugin</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#solution"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Solution
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">Login</Button>
            <Button>Login</Button>
          </div>

          <button
            className="md:hidden relative p-2 text-muted-foreground w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu
              className={cn(
                'absolute w-6 h-6 transition-all duration-300',
                isMobileMenuOpen
                  ? 'rotate-90 opacity-0 scale-50'
                  : 'rotate-0 opacity-100 scale-100',
              )}
            />
            <X
              className={cn(
                'absolute w-6 h-6 transition-all duration-300',
                isMobileMenuOpen
                  ? 'rotate-0 opacity-100 scale-100'
                  : '-rotate-90 opacity-0 scale-50',
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 border-b bg-background p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-300">
            <a
              href="#features"
              className="text-sm font-medium text-foreground p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#solution"
              className="text-sm font-medium text-foreground p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solution
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-foreground p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <div className="flex flex-col gap-2 mt-2 pt-4 border-t">
              <Button variant="outline" className="w-full">
                Login
              </Button>
              <Button className="w-full">Login</Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col gap-8 animate-fade-in-up duration-500">
              <a
                href="#new"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium w-fit hover:bg-secondary/80 transition-colors"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                New - Introduction Tailark Html
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Production Ready Digital Marketing blocks
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum
                  omnis beatae ipsum soluta!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" placeholder="Enter your email" className="pl-9 h-11" />
                </div>
                <Button className="h-11 px-8 gap-2 w-full sm:w-auto">
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Get Started</span>
                  <SendHorizonal className="w-4 h-4 sm:hidden" />
                </Button>
              </div>

              <ul className="flex flex-wrap gap-4 md:gap-6 text-sm font-medium text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  Faster
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  Modern
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  100% Customizable
                </li>
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none animate-fade-in duration-700 delay-150">
              <div className="relative rounded-2xl overflow-hidden border shadow-2xl aspect-[4/3] bg-muted">
                <img
                  src="https://img.usecurling.com/p/800/600?q=audio%20studio&color=blue"
                  alt="Audio Studio App Dark"
                  className="w-full h-full object-cover hidden dark:block"
                />
                <img
                  src="https://img.usecurling.com/p/800/600?q=recording%20studio&color=white"
                  alt="Audio Studio App Light"
                  className="w-full h-full object-cover block dark:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
