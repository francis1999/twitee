import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";




@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
){
    constructor(
        config:ConfigService,
        private prisma:PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('SECRET_KEY'),
        })
    }

    async validate(payload: {
        id: number; 
        email: string;
    }) {
        const user = 
        await this.prisma.auth.findUnique({
            where:{
                id:payload.id,
            }
        })
        
        delete user.hash
        return user;  
    }
}