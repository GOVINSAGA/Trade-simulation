import { api } from '../services/api';

import { useUserStore } from '../store/useUserStore';

import type { Stock } from '../types/stock';

interface Props {
    stock: Stock;
}

export default function StockCard({
    stock,
}: Props) {
    const user = useUserStore((state) => state.user);

    const setUser = useUserStore(
        (state) => state.setUser,
    );

    const handleBuy = async () => {
        if (!user) return;

        try {
            const response = await api.post(
                '/market/buy',
                {
                    userId: user.id,
                    symbol: stock.symbol,
                    quantity: 1,
                },
            );

            setUser(response.data);

            localStorage.setItem(
                'simulation-user',
                JSON.stringify(response.data),
            );

            alert(`Bought 1 share of ${stock.symbol}`);
        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                'Purchase failed',
            );
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

            <button
                onClick={handleBuy}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
            >
                Buy
            </button>
        </div>
    );
}