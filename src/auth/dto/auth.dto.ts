import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {

    @IsNotEmpty({message: 'อีเมล์ห้ามว่าง'})
    @IsEmail({}, {message: 'รูปแบบอีเมล์ไม่ถูกต้อง'})
    email: string;

    @IsNotEmpty({message: 'รหัสผ่านห้ามว่าง'})
    @MinLength(3, { each: true, message: 'รหัสผ่านต้องมากกว่า $constraint1 ตัวอักษรขึ้นไป' })
    password: string;
}