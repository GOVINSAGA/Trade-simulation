import { useState } from 'react';

import { api } from '../services/api';

import { useUserStore } from '../store/useUserStore';

import type { Stock } from '../types/stock';

interface Props {
    stock: Stock;

    refreshPortfolio: () => void;
}

export default function StockCard({
    stock,
    refreshPortfolio,
}: Props) {
    const user = useUserStore((state) => state.user);

    const setUser = useUserStore(
        (state) => state.setUser,
    );

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        if (!user) return;

        try {
            setLoading(true);

            const response = await api.post(
                '/market/buy',
                {
                    userId: user.id,
                    symbol: stock.symbol,
                    quantity,
                },
            );

            setUser(response.data);

            localStorage.setItem(
                'simulation-user',
                JSON.stringify(response.data),
            );

            refreshPortfolio();

            alert(
                `Bought ${quantity} share(s) of ${stock.symbol}`,
            );
        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                'Purchase failed',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 p-5 rounded-2xl">
            <h2 className="text-xl font-bold">
                {stock.symbol}
            </h2>

            <p className="text-zinc-400 mb-3">
                {stock.name}
            </p>

            <p className="text-2xl text-green-400 font-bold mb-4">
                ₹ {stock.price.toLocaleString()}
            </p>

            <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                    setQuantity(Number(e.target.value))
                }
                className="w-full mb-4 p-2 rounded-lg bg-zinc-800 border border-zinc-700"
            />

            <button
                onClick={handleBuy}
                disabled={loading}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold w-full"
            >
                {loading ? 'Buying...' : 'Buy'}
            </button>
        </div>
    );
}