import { useState } from 'react';
import { api } from '../services/api';
import { useUserStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);


    const setUser = useUserStore((state) => state.setUser);

    const navigate = useNavigate();

    const handleBegin = async () => {
        if (!username.trim()) return;

        try {
            setLoading(true);

            const response = await api.post('/users/quick-login', {
                username,
            });

            setUser(response.data);

            localStorage.setItem(
                'simulation-user',
                JSON.stringify(response.data),
            );

            // alert('Simulation Started');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    TradeSim
                </h1>

                <input
                    type="text"
                    placeholder="Enter username"
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <button
                    onClick={handleBegin}
                    disabled={loading}
                    className="w-full bg-white text-black p-3 rounded-lg font-semibold"
                >
                    {loading ? 'Starting...' : 'Begin Simulation'}
                </button>
            </div>
        </div>
    );
}