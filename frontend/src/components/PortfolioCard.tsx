import { api } from '../services/api';

import { useUserStore } from '../store/useUserStore';

import type { PortfolioItem } from '../types/portfolio';

interface Props {
    item: PortfolioItem;

    refreshPortfolio: () => void;
}

export default function PortfolioCard({
    item,
    refreshPortfolio,
}: Props) {
    const user = useUserStore((state) => state.user);

    const setUser = useUserStore(
        (state) => state.setUser,
    );

    const handleSell = async () => {
        if (!user) return;

        try {
            const response = await api.post(
                '/market/sell',
                {
                    userId: user.id,
                    symbol: item.symbol,
                    quantity: 1,
                },
            );

            setUser(response.data);

            localStorage.setItem(
                'simulation-user',
                JSON.stringify(response.data),
            );

            refreshPortfolio();

            alert(`Sold 1 share of ${item.symbol}`);
        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                'Sell failed',
            );
        }
    };

    return (
        <div className="bg-zinc-900 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                    {item.symbol}
                </h2>

                <span className="text-zinc-400">
                    Qty: {item.quantity}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <p>
                    Avg Buy:
                    <span className="ml-2">
                        ₹ {item.averagePrice.toLocaleString()}
                    </span>
                </p>

                <p>
                    Current:
                    <span className="ml-2">
                        ₹ {item.currentPrice.toLocaleString()}
                    </span>
                </p>

                <p>
                    P/L:
                    <span
                        className={`ml-2 font-bold ${item.profitLoss >= 0
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                    >
                        ₹ {item.profitLoss.toLocaleString()}
                    </span>
                </p>
            </div>

            <button
                onClick={handleSell}
                className="bg-red-500 px-4 py-2 rounded-lg w-full"
            >
                Sell 1 Share
            </button>
        </div>
    );
}