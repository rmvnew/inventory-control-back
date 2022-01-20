import { ApiProperty } from "@nestjs/swagger"



export class CreatePhoneDto {

    @ApiProperty()
    phone_number: string

    createAt: string

    updateAt: string

}
