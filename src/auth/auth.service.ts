import { ForbiddenException,Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon from 'argon2'
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private mailService:MailerService, private Jwt:JwtService, private Config:ConfigService){}
    async signup(dto:AuthDto){
        //generate the password hash
        const hash=await argon.hash(dto.password)
        const email = dto.email;
        const username = email.substring(0,email.indexOf('@'))
        //reurn the saved user

        try {
            const Auth = await this.prisma.auth.create({
                data:{
                    email:dto.email,
                    hash,
                    name:dto.name,
                    userName:username
                }      
        })
        await this.mailService.sendMail({
            to:Auth.email,
            from:"gbade1988@gmail.com",
            subject: 'Verification Link',
            text: 'Welcome NestJS Email Sending Tutorial', 
           });
        return this.signToken(Auth.id,Auth.email)
        //delete Auth.hash
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) { 
                if(error.code==='P2002'){
                    throw new ForbiddenException("Credentials already exist")
                } 

            }else{
                throw error
            }
        }
        
    }


    async sign(dto:LoginDto){
        const user= await this.prisma.auth.findUnique({
            where:{email:dto.email}
        });
        if(!user){
            throw new ForbiddenException("Email not found");
        }
            const compare= await argon.verify(user.hash,dto.password);
            if(!compare){
                throw new ForbiddenException("password not correct");
            }
            return this.signToken(user.id,user.email)
        
    }
    

    /* async getUserProfile(){
        //const getUser=await this.prisma.auth.findAll()
        return "getUser"
    } */

    async signToken(
        userId:number, 
        email:string
        ):Promise<{access_token:string}>
        {      
        const data={
            id:userId,
            email
        }
        const secretekey=this.Config.get('SECRET_KEY')
        const token= await this.Jwt.signAsync(
        data,
        {
            expiresIn: '1d',
            secret:secretekey
        }
        )
        return {
            access_token:token
        }
    
    }
}