import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { MarketService } from './market.service';

import { BuyStockDto } from './dto/buy-stock.dto';
import { SellStockDto } from './dto/sell-stock.dto';

@Controller('market')
export class MarketController {
    constructor(
        private readonly marketService: MarketService,
    ) { }

    @Get('stocks')
    async getStocks() {
        return this.marketService.getStocks();
    }

    @Post('buy')
    buyStock(@Body() dto: BuyStockDto) {
        return this.marketService.buyStock(dto);
    }

    @Post('sell')
    sellStock(@Body() dto: SellStockDto) {
        return this.marketService.sellStock(dto);
    }

    @Get('portfolio/:userId')
    getPortfolio(
        @Param('userId') userId: string,
    ) {
        return this.marketService.getPortfolio(
            userId,
        );
    }
}