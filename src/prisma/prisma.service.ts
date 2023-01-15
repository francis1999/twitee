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
}
