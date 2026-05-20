import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useUserStore } from '../store/useUserStore';

export default function ProfileMenu() {
    const user = useUserStore((state) => state.user);

    const clearUser = useUserStore(
        (state) => state.clearUser,
    );

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem(
            'simulation-user',
        );

        clearUser();

        navigate('/');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-black"
            >
                {user?.username?.charAt(0).toUpperCase()}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-5 border-b border-zinc-800">
                        <h2 className="font-bold text-lg">
                            {user?.username}
                        </h2>

                        <p className="text-zinc-400 text-sm mt-1">
                            Virtual Trading Account
                        </p>
                    </div>

                    <div className="p-5 border-b border-zinc-800">
                        <p className="text-zinc-400 text-sm mb-2">
                            Wallet Balance
                        </p>

                        <h2 className="text-2xl font-bold text-green-400">
                            ₹{' '}
                            {user?.wallet?.balance?.toLocaleString()}
                        </h2>
                    </div>

                    <div className="p-3">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 hover:bg-red-600 transition px-4 py-3 rounded-xl font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}