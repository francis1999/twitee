import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(Config : ConfigService){
        super({
            datasources:{
                db:{
                    url:Config.get("DATABASE_URL")
                }
            }
        })
    }

    cleanDb(){
        return this.$transaction([
            this.like.deleteMany(),
            this.comment.deleteMany(),
            this.twit.deleteMany(),
            this.auth.deleteMany()
        ])
    }
}
