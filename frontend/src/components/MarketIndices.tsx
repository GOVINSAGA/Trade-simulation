export default function MarketIndices() {
    return (
        <div className="flex gap-6 overflow-x-auto mb-8 pb-2">
            <div className="bg-zinc-900 px-5 py-3 rounded-xl min-w-fit">
                <p className="text-zinc-400 text-sm">
                    NIFTY 50
                </p>

                <h2 className="text-xl font-bold text-green-400">
                    23,650
                </h2>
            </div>

            <div className="bg-zinc-900 px-5 py-3 rounded-xl min-w-fit">
                <p className="text-zinc-400 text-sm">
                    SENSEX
                </p>

                <h2 className="text-xl font-bold text-green-400">
                    75,318
                </h2>
            </div>

            <div className="bg-zinc-900 px-5 py-3 rounded-xl min-w-fit">
                <p className="text-zinc-400 text-sm">
                    BANKNIFTY
                </p>

                <h2 className="text-xl font-bold text-green-400">
                    53,562
                </h2>
            </div>
        </div>
    );
}