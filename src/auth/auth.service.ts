import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
      ) {}

    async login(email: string, password: string) {

        const user = await this.usersRepository.findOne({
            select: ['id','permission','password'],
            where: { email: email }
        });
        if (!user) {
            throw new NotFoundException('ไม่พบผู้ใช้นี้ในระบบ');
        }

        //เปรียบเทียบรหัสผ่านว่าตรงกันหรือไม่
        const isValid = await argon2.verify(user.password, password);
        if (!isValid) {
            throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง'); // 401
        }

        //สร้าง token
        const token = await this.jwtService.signAsync({
            user_id: user.id,
            permission: user.permission
        }, { secret: process.env.JWT_SECRET } );

        return {
            access_token: token
        };
    }    

      
}
