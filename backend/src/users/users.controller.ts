import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { QuickLoginDto } from './dto/quick-login.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('quick-login')
    quickLogin(@Body() dto: QuickLoginDto) {
        return this.usersService.quickLogin(dto);
    }
}