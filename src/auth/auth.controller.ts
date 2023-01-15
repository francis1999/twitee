import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto } from "./dto";

@Controller("auths")
export class AuthController{
    constructor(private authService: AuthService){}
   
    @Post("sign-up")
    signup(@Body() dto:AuthDto){
        return this.authService.signup(dto)
    }
    @Post("sign-in")
    sign(@Body() dto:LoginDto){
        return this.authService.sign(dto)
    }


}