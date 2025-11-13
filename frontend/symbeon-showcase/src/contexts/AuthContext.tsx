import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário salvo
    const savedUser = localStorage.getItem('symbeon_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        localStorage.removeItem('symbeon_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulação de login (substituir por API real)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar credenciais (em produção, isso seria feito no backend)
      const users = JSON.parse(localStorage.getItem('symbeon_users') || '[]')
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      )

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          avatar: foundUser.avatar,
          createdAt: foundUser.createdAt,
        }
        setUser(userData)
        localStorage.setItem('symbeon_user', JSON.stringify(userData))
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulação de registro (substituir por API real)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const users = JSON.parse(localStorage.getItem('symbeon_users') || '[]')

      // Verificar se email já existe
      if (users.some((u: any) => u.email === email)) {
        setIsLoading(false)
        return false
      }

      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password, // Em produção, isso seria hash
        name,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem('symbeon_users', JSON.stringify(users))

      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      }

      setUser(userData)
      localStorage.setItem('symbeon_user', JSON.stringify(userData))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Erro no registro:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('symbeon_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

