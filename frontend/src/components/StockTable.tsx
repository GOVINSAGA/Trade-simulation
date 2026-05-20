import { useState } from 'react';

import { api } from '../services/api';

import { useUserStore } from '../store/useUserStore';

import type { Stock } from '../types/stock';

interface Props {
    stocks: Stock[];
}

export default function StockTable({
    stocks,
}: Props) {
    const user = useUserStore((state) => state.user);

    const setUser = useUserStore(
        (state) => state.setUser,
    );

    const [quantities, setQuantities] =
        useState<Record<string, number>>({});

    const handleBuy = async (
        symbol: string,
    ) => {
        if (!user) return;

        const quantity =
            quantities[symbol] || 1;

        try {
            const response = await api.post(
                '/market/buy',
                {
                    userId: user.id,
                    symbol,
                    quantity,
                },
            );

            setUser(response.data);

            localStorage.setItem(
                'simulation-user',
                JSON.stringify(response.data),
            );

            alert(
                `Bought ${quantity} share(s) of ${symbol}`,
            );
        } catch (error: any) {
            alert(
                error?.response?.data?.message ||
                'Purchase failed',
            );
        }
    };

    return (
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
            <table className="w-full">
                <thead className="bg-zinc-800">
                    <tr>
                        <th className="text-left p-4">
                            Stock
                        </th>

                        <th className="text-left p-4">
                            Sector
                        </th>

                        <th className="text-left p-4">
                            Price
                        </th>

                        <th className="text-left p-4">
                            Quantity
                        </th>

                        <th className="text-left p-4">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {stocks.map((stock) => (
                        <tr
                            key={stock.symbol}
                            className="border-t border-zinc-800"
                        >
                            <td className="p-4">
                                <div>
                                    <p className="font-semibold">
                                        {stock.symbol}
                                    </p>

                                    <p className="text-zinc-400 text-sm">
                                        {stock.name}
                                    </p>
                                </div>
                            </td>

                            <td className="p-4">
                                {(stock as any).sector ||
                                    'N/A'}
                            </td>

                            <td className="p-4 text-green-400 font-bold">
                                ₹{' '}
                                {stock.price.toLocaleString()}
                            </td>

                            <td className="p-4">
                                <input
                                    type="number"
                                    min={1}
                                    value={
                                        quantities[stock.symbol] ||
                                        1
                                    }
                                    onChange={(e) =>
                                        setQuantities({
                                            ...quantities,
                                            [stock.symbol]:
                                                Number(e.target.value),
                                        })
                                    }
                                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 w-24"
                                />
                            </td>

                            <td className="p-4">
                                <button
                                    onClick={() =>
                                        handleBuy(stock.symbol)
                                    }
                                    className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
                                >
                                    Buy
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}