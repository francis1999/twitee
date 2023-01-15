
//to apply validation, we will change the interface to class

import { IsEmail, IsNotEmpty,IsString } from "class-validator"

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    name:string

    userName:string
}

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsNotEmpty()
    @IsString()
    password: string
}
export class UserDto{
    
    email: string
    userName: string
    name: string
}
