import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { useUserStore } from '../store/useUserStore';

import type { PortfolioItem } from '../types/portfolio';

export default function HoldingsPage() {
    const user = useUserStore((state) => state.user);

    const [portfolio, setPortfolio] = useState<
        PortfolioItem[]
    >([]);

    useEffect(() => {
        fetchPortfolio();

        const interval = setInterval(() => {
            fetchPortfolio();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

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

    const handleSell = async (
        symbol: string,
    ) => {
        try {
            const response = await api.post(
                '/market/sell',
                {
                    userId: user?.id,
                    symbol,
                    quantity: 1,
                },
            );

            localStorage.setItem(
                'simulation-user',
                JSON.stringify(response.data),
            );

            fetchPortfolio();

            alert(`Sold 1 share of ${symbol}`);
        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                'Sell failed',
            );
        }
    };

    const totalInvested = portfolio.reduce(
        (acc, item) => acc + item.investedValue,
        0,
    );

    const currentValue = portfolio.reduce(
        (acc, item) => acc + item.currentValue,
        0,
    );

    const totalPL =
        currentValue - totalInvested;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">
                Holdings
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-zinc-900 p-6 rounded-2xl">
                    <p className="text-zinc-400 mb-2">
                        Current Value
                    </p>

                    <h2 className="text-3xl font-bold">
                        ₹ {currentValue.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl">
                    <p className="text-zinc-400 mb-2">
                        Invested Value
                    </p>

                    <h2 className="text-3xl font-bold">
                        ₹ {totalInvested.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl">
                    <p className="text-zinc-400 mb-2">
                        Total Returns
                    </p>

                    <h2
                        className={`text-3xl font-bold ${totalPL >= 0
                            ? 'text-green-400'
                            : 'text-red-400'
                            }`}
                    >
                        ₹ {totalPL.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl">
                    <p className="text-zinc-400 mb-2">
                        Holdings
                    </p>

                    <h2 className="text-3xl font-bold">
                        {portfolio.length}
                    </h2>
                </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-800">
                        <tr>
                            <th className="text-left p-4">
                                Stock
                            </th>

                            <th className="text-left p-4">
                                Qty
                            </th>

                            <th className="text-left p-4">
                                Avg Buy
                            </th>

                            <th className="text-left p-4">
                                Current
                            </th>

                            <th className="text-left p-4">
                                Invested
                            </th>

                            <th className="text-left p-4">
                                Current Value
                            </th>

                            <th className="text-left p-4">
                                P/L
                            </th>
                            <th className="text-left p-4">
                                Allocation
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {portfolio.map((item) => (
                            <tr
                                key={item.symbol}
                                className="border-t border-zinc-800"
                            >
                                <td className="p-4 font-semibold">
                                    {item.symbol}
                                </td>

                                <td className="p-4">
                                    {item.quantity}
                                </td>

                                <td className="p-4">
                                    ₹{' '}
                                    {item.averagePrice.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    ₹{' '}
                                    {item.currentPrice.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    ₹{' '}
                                    {item.investedValue.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    ₹{' '}
                                    {item.currentValue.toLocaleString()}
                                </td>

                                <td
                                    className={`p-4 font-bold ${item.profitLoss >= 0
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                        }`}
                                >
                                    ₹{' '}
                                    {item.profitLoss.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    {(
                                        (item.currentValue /
                                            currentValue) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </td>

                                <td className="p-4">
                                    <button
                                        onClick={() =>
                                            handleSell(item.symbol)
                                        }
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                                    >
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}