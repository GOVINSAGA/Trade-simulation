import { Injectable, Logger } from '@nestjs/common';

import { Cron } from '@nestjs/schedule';

import { PrismaService } from '../prisma/prisma.service';

import { fetchNifty50Stocks } from './dhan.service';

@Injectable()
export class MarketCronService {
  private readonly logger = new Logger(
    MarketCronService.name,
  );

  constructor(private prisma: PrismaService) { }

  @Cron('*/1 * * * *')
  async updateStocks() {
    this.logger.log(
      'Fetching latest NIFTY 50 data...',
    );

    try {
      const stocks =
        await fetchNifty50Stocks();

      for (const stock of stocks) {
        await this.prisma.stock.upsert({
          where: {
            symbol: stock.Sym,
          },

          update: {
            name: stock.DispSym,
            price: Number(stock.Ltp),
            marketCap: Number(stock.Mcap),
            pe: Number(stock.Pe),
            sector: stock.Sector,
            volume: Number(stock.Volume),
          },

          create: {
            symbol: stock.Sym,
            name: stock.DispSym,
            price: Number(stock.Ltp),
            marketCap: Number(stock.Mcap),
            pe: Number(stock.Pe),
            sector: stock.Sector,
            volume: Number(stock.Volume),
          },
        });
      }

      this.logger.log(
        'Stock data updated successfully.',
      );
    } catch (error) {
      this.logger.error(
        'Failed to update stock data',
        error,
      );
    }
  }
}