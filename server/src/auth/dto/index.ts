import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Username can only contain letters, numbers, underscores and hyphens',
    })
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password must contain at least 8 characters, including upper and lowercase letters and numbers',
    })
    password: string;
}

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RefreshTokenDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}