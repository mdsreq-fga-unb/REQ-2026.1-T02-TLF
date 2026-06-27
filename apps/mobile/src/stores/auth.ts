import { create } from 'zustand'

type User = { id: string; name: string; email: string }

type AuthState = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isBootstrapping: boolean
  setSession: (user: User, accessToken: string, refreshToken: string) => void
  logout: () => void
  finishBootstrap: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isBootstrapping: true,
  setSession: (user, accessToken, refreshToken) =>
    set({ user, accessToken, refreshToken, isAuthenticated: true }),
  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  },
  finishBootstrap: () => set({ isBootstrapping: false }),
}))
