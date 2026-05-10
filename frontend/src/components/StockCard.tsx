import type { Stock } from '../types/stock';

interface Props {
    stock: Stock;
}

export default function StockCard({ stock }: Props) {
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

            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
                Buy
            </button>
        </div>
    );
}