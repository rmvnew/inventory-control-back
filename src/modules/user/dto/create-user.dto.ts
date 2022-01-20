import { ApiProperty } from "@nestjs/swagger"
import { UserProfile } from "src/helper/Enums"
import { CreatePhoneDto } from "src/modules/phone/dto/create-phone.dto"



export class CreateUserDto {


    @ApiProperty()
    phone:CreatePhoneDto

    @ApiProperty()
    id_occupation: number
    
    @ApiProperty()
    id_department: number

    @ApiProperty()
    name:string

    @ApiProperty()
    email:string

    @ApiProperty()
    password:string

    @ApiProperty()
    register:string

    @ApiProperty()
    permission: UserProfile

    createAt: string

    updateAt: string

}
