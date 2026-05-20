import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { MOCK_STOCKS } from './mock-stocks';

import { BuyStockDto } from './dto/buy-stock.dto';

import { SellStockDto } from './dto/sell-stock.dto';


@Injectable()
export class MarketService {
    constructor(private prisma: PrismaService,
    ) { }

    getStocks() {
        return MOCK_STOCKS;
    }

    async buyStock(dto: BuyStockDto) {
        const stock = MOCK_STOCKS.find(
            (s) => s.symbol === dto.symbol,
        );

        if (!stock) {
            throw new BadRequestException('Stock not found');
        }

        const totalCost = stock.price * dto.quantity;

        const user = await this.prisma.user.findUnique({
            where: {
                id: dto.userId,
            },
            include: {
                wallet: true,
            },
        });

        if (!user || !user.wallet) {
            throw new BadRequestException('User not found');
        }

        if (user.wallet.balance < totalCost) {
            throw new BadRequestException(
                'Insufficient balance',
            );
        }

        await this.prisma.wallet.update({
            where: {
                id: user.wallet.id,
            },
            data: {
                balance: {
                    decrement: totalCost,
                },
            },
        });

        const existingHolding =
            await this.prisma.holding.findFirst({
                where: {
                    userId: user.id,
                    symbol: dto.symbol,
                },
            });

        if (existingHolding) {
            const totalQuantity =
                existingHolding.quantity + dto.quantity;

            const totalValue =
                existingHolding.averagePrice *
                existingHolding.quantity +
                stock.price * dto.quantity;

            const averagePrice =
                totalValue / totalQuantity;

            await this.prisma.holding.update({
                where: {
                    id: existingHolding.id,
                },
                data: {
                    quantity: totalQuantity,
                    averagePrice,
                },
            });
        } else {
            await this.prisma.holding.create({
                data: {
                    userId: user.id,
                    symbol: dto.symbol,
                    quantity: dto.quantity,
                    averagePrice: stock.price,
                },
            });
        }

        await this.prisma.trade.create({
            data: {
                userId: user.id,
                symbol: dto.symbol,
                quantity: dto.quantity,
                price: stock.price,
                type: 'BUY',
            },
        });

        const updatedUser =
            await this.prisma.user.findUnique({
                where: {
                    id: user.id,
                },
                include: {
                    wallet: true,
                    holdings: true,
                },
            });

        return updatedUser;
    }

    async getPortfolio(userId: string) {
        const holdings =
            await this.prisma.holding.findMany({
                where: {
                    userId,
                },
            });

        const portfolio = holdings.map((holding) => {
            const stock = MOCK_STOCKS.find(
                (s) => s.symbol === holding.symbol,
            );

            const currentPrice = stock?.price || 0;

            const investedValue =
                holding.averagePrice * holding.quantity;

            const currentValue =
                currentPrice * holding.quantity;

            const profitLoss =
                currentValue - investedValue;

            return {
                symbol: holding.symbol,

                quantity: holding.quantity,

                averagePrice: holding.averagePrice,

                currentPrice,

                investedValue,

                currentValue,

                profitLoss,
            };
        });

        return portfolio;
    }

    async sellStock(dto: SellStockDto) {
        const stock = MOCK_STOCKS.find(
            (s) => s.symbol === dto.symbol,
        );

        if (!stock) {
            throw new BadRequestException('Stock not found');
        }

        const holding =
            await this.prisma.holding.findFirst({
                where: {
                    userId: dto.userId,
                    symbol: dto.symbol,
                },
            });

        if (!holding) {
            throw new BadRequestException(
                'Holding not found',
            );
        }

        if (holding.quantity < dto.quantity) {
            throw new BadRequestException(
                'Not enough shares',
            );
        }

        const totalValue = stock.price * dto.quantity;

        await this.prisma.wallet.update({
            where: {
                userId: dto.userId,
            },
            data: {
                balance: {
                    increment: totalValue,
                },
            },
        });

        const remainingQuantity =
            holding.quantity - dto.quantity;

        if (remainingQuantity === 0) {
            await this.prisma.holding.delete({
                where: {
                    id: holding.id,
                },
            });
        } else {
            await this.prisma.holding.update({
                where: {
                    id: holding.id,
                },
                data: {
                    quantity: remainingQuantity,
                },
            });
        }

        await this.prisma.trade.create({
            data: {
                userId: dto.userId,
                symbol: dto.symbol,
                quantity: dto.quantity,
                price: stock.price,
                type: 'SELL',
            },
        });

        return this.prisma.user.findUnique({
            where: {
                id: dto.userId,
            },
            include: {
                wallet: true,
                holdings: true,
            },
        });
    }


}