import { ApiProperty } from "@nestjs/swagger"




export class CreateCategoryDto {

    @ApiProperty()
    name: string

    createAt: string

    updateAt: string

}
