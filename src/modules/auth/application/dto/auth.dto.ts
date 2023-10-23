import {  IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {

    @ApiProperty({ description: 'usuario ' })
    @IsNotEmpty()
    user: string;

    @ApiProperty({ description: 'clave de usuario' })
    @IsNotEmpty()
    password: string;
}