export interface Trade {
    id: string;

    symbol: string;

    quantity: number;

    price: number;

    type: 'BUY' | 'SELL';

    createdAt: string;
}