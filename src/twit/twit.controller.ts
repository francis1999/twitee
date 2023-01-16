import { Controller, Get, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';



@UseGuards(JwtGuard)
@Controller('twits')
export class TwitController {
    @Get()
    getTwits(){}

    getTwitById(){}

    editTwit(){}
    
    deleteTwit(){}
}
