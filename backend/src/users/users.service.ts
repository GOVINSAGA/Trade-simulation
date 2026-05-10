import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuickLoginDto } from './dto/quick-login.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async quickLogin(dto: QuickLoginDto) {
        let user = await this.prisma.user.findUnique({
            where: {
                username: dto.username,
            },
            include: {
                wallet: true,
            },
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    wallet: {
                        create: {
                            balance: 1000000,
                        },
                    },
                },
                include: {
                    wallet: true,
                },
            });
        }

        return user;
    }
}