import { IsInt, IsPositive, IsString } from 'class-validator';

export class BuyStockDto {
    @IsString()
    userId!: string;

    @IsString()
    symbol!: string;

    @IsInt()
    @IsPositive()
    quantity!: number;
}