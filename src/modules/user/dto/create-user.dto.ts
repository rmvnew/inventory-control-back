import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, isString, IsString, MaxLength, MinLength } from "class-validator"
import { UserProfile } from "src/helper/Enums"
import { CreatePhoneDto } from "src/modules/phone/dto/create-phone.dto"



export class CreateUserDto {


    @ApiProperty()
    @IsOptional()
    phone:CreatePhoneDto

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_occupation: number
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_department: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(5)
    name:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(10)
    email:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    register:string

    @ApiProperty()
    @IsOptional()
    @IsEnum(UserProfile)
    @IsNotEmpty()
    permission: UserProfile

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string

}
