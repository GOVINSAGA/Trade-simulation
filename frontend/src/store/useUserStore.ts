import { create } from 'zustand';

interface Wallet {
    balance: number;
}

interface User {
    id: string;
    username: string;
    wallet: Wallet;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user) => set({ user }),
}));