import { ApiProperty } from "@nestjs/swagger";

export class CreateUsereDto {
    @ApiProperty({description : 'Username'})
    readonly username: string;
    @ApiProperty({description : 'Password'})
    readonly password: string;
}