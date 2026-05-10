import { IsNotEmpty, IsString } from 'class-validator';

export class QuickLoginDto {
    @IsString()
    @IsNotEmpty()
    username!: string;
}