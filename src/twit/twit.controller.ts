import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { get } from 'http';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTwit } from './dto/create.twit.dto';
import { EditTwit } from './dto/edit.twit.dto';
import { TwitService } from './twit.service';



@UseGuards(JwtGuard)
@Controller('twits')
export class TwitController {
    constructor(private twitService: TwitService){}

    @Post()
    createtwit(@GetUser('id') authId:number, @Body() dto:CreateTwit){
        return this.twitService.createtwit(authId,dto)
    }

    @Get('get-all-twits')
    getTwits(@GetUser('id') authId:number){
        return this.twitService.getTwits(authId)
    }

    @Get(':id')
    getTwitById(@GetUser('id') authId:number,
    @Param('id', ParseIntPipe) twitId:number,){
        return this.twitService.getTwitById(authId,twitId)
    }
    

    @Patch(':id')
    editTwit(@GetUser('id') authId:number,
    @Param('id', ParseIntPipe) twitId:number,
    @Body() dto:EditTwit,
    ){
        return this.twitService.editTwit(authId,twitId,dto)
    }
    
    @Delete(':id')
    deleteTwit(@GetUser('id') authId:number,
    @Param('id', ParseIntPipe) twitId:number,){
        return this.twitService.deleteTwit(authId,twitId)
    }
}
