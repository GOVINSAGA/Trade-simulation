import {
    Body,
    Controller,
    Get,
    Post,
    Param,
} from '@nestjs/common';

import { MarketService } from './market.service';

import { BuyStockDto } from './dto/buy-stock.dto';

@Controller('market')
export class MarketController {
    constructor(
        private readonly marketService: MarketService,
    ) { }

    @Get('stocks')
    getStocks() {
        return this.marketService.getStocks();
    }

    @Post('buy')
    buyStock(@Body() dto: BuyStockDto) {
        return this.marketService.buyStock(dto);
    }

    @Get('portfolio/:userId')
    getPortfolio(@Param('userId') userId: string) {
        return this.marketService.getPortfolio(userId);
    }

    
}