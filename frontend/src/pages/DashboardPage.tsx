import { useEffect, useState } from 'react';

import { useUserStore } from '../store/useUserStore';
import { api } from '../services/api';

import type { Stock } from '../types/stock';

import StockCard from '../components/StockCard';

export default function DashboardPage() {
    const user = useUserStore((state) => state.user);

    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await api.get('/market/stocks');

            setStocks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-6">
                Welcome, {user?.username}
            </h1>

            <div className="bg-zinc-900 p-6 rounded-2xl max-w-md mb-10">
                <h2 className="text-xl mb-2">Virtual Wallet</h2>

                <p className="text-3xl font-bold text-green-400">
                    ₹ {user?.wallet?.balance?.toLocaleString()}
                </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">
                Available Stocks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stocks.map((stock) => (
                    <StockCard
                        key={stock.symbol}
                        stock={stock}
                    />
                ))}
            </div>
        </div>
    );
}