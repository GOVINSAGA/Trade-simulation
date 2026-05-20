import { useEffect, useState } from 'react';

import { useUserStore } from '../store/useUserStore';

import { api } from '../services/api';

import type { Stock } from '../types/stock';
import type { PortfolioItem } from '../types/portfolio';

import StockCard from '../components/StockCard';
import PortfolioCard from '../components/PortfolioCard';

export default function DashboardPage() {
    const user = useUserStore((state) => state.user);

    const [stocks, setStocks] = useState<Stock[]>([]);

    const [portfolio, setPortfolio] = useState<
        PortfolioItem[]
    >([]);

    useEffect(() => {
        fetchStocks();

        if (user?.id) {
            fetchPortfolio();
        }
    }, [user]);

    const fetchStocks = async () => {
        try {
            const response = await api.get('/market/stocks');

            setStocks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPortfolio = async () => {
        try {
            const response = await api.get(
                `/market/portfolio/${user?.id}`,
            );

            setPortfolio(response.data);
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
                Portfolio
            </h2>

            {portfolio.length === 0 ? (
                <p className="text-zinc-400 mb-10">
                    No holdings yet
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                    {portfolio.map((item) => (
                        <PortfolioCard
                            key={item.symbol}
                            item={item}
                            refreshPortfolio={fetchPortfolio}
                        />
                    ))}
                </div>
            )}

            <h2 className="text-3xl font-bold mb-6">
                Available Stocks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stocks.map((stock) => (
                    <StockCard
                        key={stock.symbol}
                        stock={stock}
                        refreshPortfolio={fetchPortfolio}
                    />
                ))}
            </div>
        </div>
    );
}