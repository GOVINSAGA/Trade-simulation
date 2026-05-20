import { Module } from '@nestjs/common';

import { MarketController } from './market.controller';
import { MarketService } from './market.service';

import { MarketCronService } from './market-cron.service';

@Module({
  controllers: [MarketController],

  providers: [
    MarketService,
    MarketCronService,
  ],
})
export class MarketModule { }