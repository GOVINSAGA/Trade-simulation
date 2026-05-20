interface Props {
    invested: number;

    current: number;

    profitLoss: number;
}

export default function PortfolioSummary({
    invested,
    current,
    profitLoss,
}: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-zinc-900 p-6 rounded-2xl">
                <p className="text-zinc-400 mb-2">
                    Invested
                </p>

                <h2 className="text-3xl font-bold">
                    ₹ {invested.toLocaleString()}
                </h2>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl">
                <p className="text-zinc-400 mb-2">
                    Current Value
                </p>

                <h2 className="text-3xl font-bold">
                    ₹ {current.toLocaleString()}
                </h2>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl">
                <p className="text-zinc-400 mb-2">
                    Total Returns
                </p>

                <h2
                    className={`text-3xl font-bold ${profitLoss >= 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                >
                    ₹ {profitLoss.toLocaleString()}
                </h2>
            </div>
        </div>
    );
}