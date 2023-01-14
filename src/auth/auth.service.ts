import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'


@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}
    async signup(dto:AuthDto){
        //generate the password hash
        const hash=await argon.hash(dto.password)
        const email = dto.email;
        const username = email.substring(0,email.indexOf('@'))
        //reurn the saved user
        const auth = await this.prisma.auth.create({
           
                data:{
                    email:dto.email,
                    hash,
                    name:dto.name,
                    userName:username
                }
        })
        return auth; 
    }
}