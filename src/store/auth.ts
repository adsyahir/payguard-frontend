import { create } from 'zustand'

// UI-only auth gate — no real authentication, no token, no backend.
type AuthState = {
  isAuthed: boolean
  email: string
  login: (email: string) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  isAuthed: false,
  email: '',
  login: (email) => set({ isAuthed: true, email }),
  logout: () => set({ isAuthed: false, email: '' }),
}))
