import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTwit } from './dto/create.twit.dto';
import { EditTwit } from './dto/edit.twit.dto';

@Injectable()
export class TwitService {
    constructor(private prisma:PrismaService){}
    
    
    createtwit(authId:number, dto:CreateTwit){}

    
    getTwits(authId:number){
        return this.prisma.twit.findMany({
            where:{
                id:authId,
            }
        })
    }

   
    getTwitById(authId:number, twitId:number){}

    
    editTwit(authId:number,twitId:number,dto:EditTwit){}
    
   
    deleteTwit(authId:number,twitId:number){}
}
