import { IsNotEmpty, IsString } from "class-validator";

export class CreateTwit{

    @IsString()
    @IsNotEmpty()
    content: string

    @IsString()
    @IsNotEmpty()
    title: string
}