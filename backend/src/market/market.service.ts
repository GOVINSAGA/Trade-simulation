import { Injectable } from '@nestjs/common';
import { MOCK_STOCKS } from './mock-stocks';

@Injectable()
export class MarketService {
    getStocks() {
        return MOCK_STOCKS;
    }
}