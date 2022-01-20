import { ApiProperty } from "@nestjs/swagger"



export class CreateDepartmentDto {


    @ApiProperty()
    name: string
    
    @ApiProperty()
    manager: string

    createAt: string

    updateAt: string


}
