import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {Request} from 'express'
import { Auth } from '@prisma/client'
import { get } from "http";
import { AuthService } from "./auth.service";
import { GetUser } from "./decorator";
import { AuthDto, LoginDto, UserDto } from "./dto";
import { JwtGuard } from "./guard";
import { HttpStatus } from "@nestjs/common/enums";

@Controller("auths")
export class AuthController{
    constructor(private authService: AuthService){}
   
    @HttpCode(HttpStatus.CREATED)
    @Post("sign-up")
    signup(@Body() dto:AuthDto){
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post("sign-in")
    sign(@Body() dto:LoginDto){
        return this.authService.sign(dto)
    }
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    @Get("me")
    getUserProfile(@GetUser() user:Auth){
        return user
    }


}