import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.fullname = createUserDto.fullname;
      user.email = createUserDto.email;
      user.password = await argon2.hash(createUserDto.password);
      return await this.usersRepository.save(user);
    } catch (error) {
      // console.log(error);
      if (error.errno === 1062) {
        throw new HttpException('อีเมล์ซ้ำ!', HttpStatus.CONFLICT); // 409
      }
      throw new HttpException('เกิดข้อผิดพลาด กรุณาลองใหม่', HttpStatus.BAD_REQUEST ); // 400
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ order: {id: 'DESC'} });
  }
  // SQL
  // async findAll(): Promise<any[]> {
  //   const sql = 'select * from user order by id desc';
  //   return await this.usersRepository.query(sql);
  // }

  //Pagination
  async findAllWithPagination(page: number = 1, page_size: number = 2): Promise<User[]> {
    const user = await this.usersRepository.find({ 
      skip: (page - 1) * page_size,
      take: page_size,
      order: {id: 'DESC'} 
    });
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('ไม่พบข้อมูลนี้ในระบบ', HttpStatus.NOT_FOUND); // 404
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    // const user = await this.findOne(id);
    // return await this.usersRepository.remove(user);
    return await this.usersRepository.delete(id);
  }
}
