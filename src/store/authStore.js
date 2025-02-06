import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../utils/supabaseClient'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      userData: {
        id: null,
        email: '',
        nombre: '',
      },
      setUser: (user) => set({ 
        user,
        userData: {
          id: user?.id || null,
          email: user?.email || '',
          nombre: user?.user_metadata?.nombre || user?.email?.split('@')[0] || '',
        }
      }),
      clearUser: () => set({ 
        user: null,
        userData: {
          id: null,
          email: '',
          nombre: '',
        }
      }),
      initializeAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          set({ 
            user: session.user,
            userData: {
              id: session.user.id,
              email: session.user.email,
              nombre: session.user.user_metadata?.nombre || session.user.email.split('@')[0],
            }
          })
        }
      }
    }),
    {
      name: 'auth-storage', // nombre para el almacenamiento
    }
  )
)

export default useAuthStore 