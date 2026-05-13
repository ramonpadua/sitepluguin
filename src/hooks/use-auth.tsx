import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import pb from '@/lib/pocketbase/client'

interface AuthContextType {
  user: any
  signInAnonymously: () => Promise<{ error: any }>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(pb.authStore.record)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record)
    })
    setLoading(false)
    return () => {
      unsubscribe()
    }
  }, [])

  const signInAnonymously = async () => {
    try {
      if (pb.authStore.isValid) return { error: null }

      const guestEmail = `guest_${Math.random().toString(36).substring(2, 9)}@plugin.local`
      const password = 'Skip@Pass123'

      await pb.collection('users').create({
        email: guestEmail,
        password,
        passwordConfirm: password,
        name: 'Visitante',
      })

      await pb.collection('users').authWithPassword(guestEmail, password)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = () => {
    pb.authStore.clear()
  }

  return (
    <AuthContext.Provider value={{ user, signInAnonymously, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
