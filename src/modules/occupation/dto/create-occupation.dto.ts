import { ApiProperty } from "@nestjs/swagger"



export class CreateOccupationDto {


    @ApiProperty()
    name: string

    createAt: string

    updateAt: string

}
