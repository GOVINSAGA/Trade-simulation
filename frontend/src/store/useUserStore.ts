import { create } from 'zustand';

interface Wallet {
  balance: number;
}

interface Holding {
  symbol: string;
  quantity: number;
  averagePrice: number;
}

interface User {
  id: string;
  username: string;
  wallet: Wallet;
  holdings?: Holding[];
}

interface UserStore {
  user: User | null;

  setUser: (user: User) => void;

  clearUser: () => void;
}

const storedUser =
  localStorage.getItem(
    'simulation-user',
  );

export const useUserStore = create<UserStore>(
  (set) => ({
    user: storedUser
      ? JSON.parse(storedUser)
      : null,

    setUser: (user) =>
      set({
        user,
      }),

    clearUser: () =>
      set({
        user: null,
      }),
  }),
);