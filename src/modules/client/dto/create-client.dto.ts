import { ApiProperty } from "@nestjs/swagger"



export class CreateClientDto {
    

    @ApiProperty()
    name: string
    
    @ApiProperty()
    register: string
    
    @ApiProperty()
    id_occupation: number
    
    @ApiProperty()
    id_department: number

    createAt: string

    updateAt: string

}
