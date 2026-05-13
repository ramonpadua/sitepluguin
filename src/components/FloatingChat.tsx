import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import pb from '@/lib/pocketbase/client'
import { streamAgentChat, type DisplayMessage } from '@/lib/skipAi'
import { useAuth } from '@/hooks/use-auth'

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user, signInAnonymously } = useAuth()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleOpen = async () => {
    setIsOpen(true)
    if (!user && !isAuthenticating) {
      setIsAuthenticating(true)
      await signInAnonymously()
      setIsAuthenticating(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: DisplayMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      created: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_POCKETBASE_URL}/backend/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: pb.authStore.token,
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_id: conversationId,
        }),
      })

      const result = await streamAgentChat(res, {
        onChunk: (delta, full) => {
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            if (last?.role === 'assistant' && last.id === 'typing') {
              return [
                ...prev.slice(0, -1),
                {
                  id: 'typing',
                  role: 'assistant',
                  content: full,
                  created: new Date().toISOString(),
                },
              ]
            } else if (last?.role === 'assistant') {
              return [...prev.slice(0, -1), { ...last, content: full }]
            } else {
              return [
                ...prev,
                {
                  id: 'typing',
                  role: 'assistant',
                  content: full,
                  created: new Date().toISOString(),
                },
              ]
            }
          })
        },
      })

      setConversationId(res.headers.get('X-Conversation-Id') ?? result.conversation_id)

      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant') {
          return [...prev.slice(0, -1), { ...last, id: result.message_id }]
        }
        return prev
      })
    } catch (err) {
      console.error(err)
      setError('Desculpe, não consegui processar sua mensagem agora. Tente novamente.')
      setMessages((prev) => prev.filter((m) => m.id !== 'typing'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full h-[100dvh] sm:w-[400px] sm:h-[600px] bg-background sm:border rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in sm:slide-in-from-bottom-5 slide-in-from-bottom-full">
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground/20 p-2 rounded-full">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold leading-none">Plugin Assistant</h3>
                <p className="text-xs text-primary-foreground/80 mt-1">Sempre online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:text-primary-foreground hover:bg-primary/20 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4 bg-muted/30">
            <div className="flex flex-col gap-4">
              {messages.length === 0 && !isAuthenticating && (
                <div className="text-center text-muted-foreground mt-8 mb-4 text-sm px-6">
                  Olá! Sou o assistente virtual da Plugin. Como posso ajudar você a conhecer mais
                  sobre nossos serviços hoje?
                </div>
              )}
              {isAuthenticating && (
                <div className="text-center text-muted-foreground mt-10 text-sm flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Conectando...
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] px-4 py-2.5 text-sm whitespace-pre-wrap shadow-sm',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm'
                        : 'bg-background border text-foreground rounded-2xl rounded-bl-sm',
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && !messages.find((m) => m.id === 'typing') && (
                <div className="flex justify-start">
                  <div className="bg-background border text-foreground rounded-2xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-1.5 shadow-sm">
                    <span
                      className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}
              {error && (
                <div className="text-center text-destructive text-sm mt-2 bg-destructive/10 p-2 rounded-lg">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </ScrollArea>

          <div className="p-3 bg-background border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2 relative"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={isLoading || isAuthenticating}
                className="flex-1 pr-12 rounded-full bg-muted/50 border-transparent focus-visible:bg-background"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading || isAuthenticating}
                className="absolute right-1 w-8 h-8 rounded-full"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in"
          onClick={handleOpen}
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
    </>
  )
}
