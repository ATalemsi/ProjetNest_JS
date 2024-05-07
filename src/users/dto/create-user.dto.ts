import { IsEmail , IsEnum, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;

    @IsEnum(["INTREN" , "ENGINNER" , "ADMIN"],{
        message: 'Valid role required'
    })
    role: "INTREN" | "ENGINNER" | "ADMIN";
}