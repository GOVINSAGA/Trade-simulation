interface Props {
    search: string;

    setSearch: (value: string) => void;
}

export default function StockSearch({
    search,
    setSearch,
}: Props) {
    return (
        <input
            type="text"
            placeholder="Search NIFTY 50 stocks..."
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 mb-8 outline-none"
        />
    );
}