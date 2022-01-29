import { ApiProperty } from "@nestjs/swagger"
import { CreateMaterialDto } from "src/material/dto/create-material.dto"



export class CreateActivityControlDto {

    @ApiProperty()
    id_client: number

    @ApiProperty()
    id_project: number

    // @ApiProperty()
    // moviment: number

    createAt: string

    updateAt: string

}
