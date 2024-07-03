import { StateCreator, create } from 'zustand';
import { AuthStore } from '../../types/auth.types';
import { devtools, persist } from 'zustand/middleware';

const authStore: StateCreator<
  AuthStore,
  [['zustand/devtools', never]]
> = set => ({
  tokenData: null,
  user: null,

  setUser: data => set({ user: data }),
  setTokenData: data => set({ tokenData: data }),
  logout: () => set({ user: null, tokenData: null }),
});

export const useAuthStore = create<AuthStore>()(
  devtools(persist(authStore, { name: 'authStore' }))
);
