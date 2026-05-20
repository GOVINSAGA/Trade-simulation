import { useEffect, useMemo, useState } from 'react';

import { api } from '../services/api';

import { useUserStore } from '../store/useUserStore';

import type { Stock } from '../types/stock';
import type { PortfolioItem } from '../types/portfolio';

import MarketIndices from '../components/MarketIndices';
import PortfolioSummary from '../components/PortfolioSummary';
import StockSearch from '../components/StockSearch';
import StockTable from '../components/StockTable';

export default function ExplorePage() {
    const user = useUserStore((state) => state.user);

    const [stocks, setStocks] = useState<
        Stock[]
    >([]);

    const [portfolio, setPortfolio] =
        useState<PortfolioItem[]>([]);

    const [search, setSearch] =
        useState('');

    useEffect(() => {
        fetchStocks();

        if (user?.id) {
            fetchPortfolio();
        }

        const interval = setInterval(() => {
            fetchStocks();

            if (user?.id) {
                fetchPortfolio();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await api.get(
                '/market/stocks',
            );

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

    const filteredStocks = useMemo(() => {
        return stocks.filter((stock) =>
            stock.symbol
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [stocks, search]);

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
                Explore
            </h1>

            <MarketIndices />

            <PortfolioSummary
                invested={totalInvested}
                current={currentValue}
                profitLoss={totalPL}
            />

            <StockSearch
                search={search}
                setSearch={setSearch}
            />

            <StockTable
                stocks={filteredStocks}
            />
        </div>
    );
}