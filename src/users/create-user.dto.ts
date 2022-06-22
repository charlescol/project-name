import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from "class-validator";

export class CreateUsereDto {
    @ApiProperty({description : 'Username', example:'Charlescol', nullable: false})
    @IsString()
    readonly username: string;
    @ApiProperty({description : 'Password', nullable: false})
    @IsString()
    readonly password: string;
}