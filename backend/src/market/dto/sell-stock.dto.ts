import { IsInt, IsPositive, IsString } from 'class-validator';

export class SellStockDto {
    @IsString()
    userId!: string;

    @IsString()
    symbol!: string;

    @IsInt()
    @IsPositive()
    quantity!: number;
}