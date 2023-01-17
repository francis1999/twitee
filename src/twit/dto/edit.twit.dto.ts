import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditTwit{

    @IsString()
    @IsOptional()
    content: string

    @IsString()
    @IsOptional()
    title: string
}