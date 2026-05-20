import { fetchNifty50Stocks } from './dhan.service';

export async function findStockBySymbol(
    symbol: string,
) {
    const stocks =
        await fetchNifty50Stocks();

    return stocks.find(
        (s: any) => s.Sym === symbol,
    );
}