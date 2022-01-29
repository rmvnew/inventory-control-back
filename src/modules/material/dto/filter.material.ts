import { ApiProperty } from "@nestjs/swagger";
import { FilterPagination } from "src/shared/filter.pagination";




export class FilterMaterial extends FilterPagination{


    @ApiProperty({required:false})
    id_client: number

    @ApiProperty({required:false})
    id_project:number

    @ApiProperty({required:false})
    id_product: number

    @ApiProperty({ required: false, default: 'ID', enum: ['ID', 'DATE'] })
    orderBy: string


}