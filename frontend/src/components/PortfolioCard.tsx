import type { PortfolioItem } from '../types/portfolio';

interface Props {
    item: PortfolioItem;
}

export default function PortfolioCard({
    item,
}: Props) {
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

            <div className="space-y-2">
                <p>
                    Avg Buy:
                    <span className="text-white ml-2">
                        ₹ {item.averagePrice.toLocaleString()}
                    </span>
                </p>

                <p>
                    Current Price:
                    <span className="text-white ml-2">
                        ₹ {item.currentPrice.toLocaleString()}
                    </span>
                </p>

                <p>
                    Invested:
                    <span className="text-white ml-2">
                        ₹ {item.investedValue.toLocaleString()}
                    </span>
                </p>

                <p>
                    Current Value:
                    <span className="text-white ml-2">
                        ₹ {item.currentValue.toLocaleString()}
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
        </div>
    );
}