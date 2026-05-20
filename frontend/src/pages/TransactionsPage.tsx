import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { useUserStore } from '../store/useUserStore';

import type { Trade } from '../types/trade';

export default function TransactionsPage() {
    const user = useUserStore((state) => state.user);

    const [trades, setTrades] = useState<
        Trade[]
    >([]);

    useEffect(() => {
        fetchTrades();
    }, []);

    const fetchTrades = async () => {
        try {
            const response = await api.get(
                `/market/transactions/${user?.id}`,
            );

            setTrades(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">
                Transactions
            </h1>

            <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-800">
                        <tr>
                            <th className="text-left p-4">
                                Type
                            </th>

                            <th className="text-left p-4">
                                Stock
                            </th>

                            <th className="text-left p-4">
                                Quantity
                            </th>

                            <th className="text-left p-4">
                                Price
                            </th>

                            <th className="text-left p-4">
                                Total
                            </th>

                            <th className="text-left p-4">
                                Time
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {trades.map((trade) => (
                            <tr
                                key={trade.id}
                                className="border-t border-zinc-800"
                            >
                                <td
                                    className={`p-4 font-bold ${trade.type === 'BUY'
                                            ? 'text-green-400'
                                            : 'text-red-400'
                                        }`}
                                >
                                    {trade.type}
                                </td>

                                <td className="p-4 font-semibold">
                                    {trade.symbol}
                                </td>

                                <td className="p-4">
                                    {trade.quantity}
                                </td>

                                <td className="p-4">
                                    ₹{' '}
                                    {trade.price.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    ₹{' '}
                                    {(
                                        trade.price *
                                        trade.quantity
                                    ).toLocaleString()}
                                </td>

                                <td className="p-4 text-zinc-400">
                                    {new Date(
                                        trade.createdAt,
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}