import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  version: '1',
  path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      permission: user.permission
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('paginate')
  findAllWithPagination(@Query() query: any) {
    return this.usersService.findAllWithPagination(query.page, query.page_size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if (result.affected === 0) {
      throw new HttpException('เกิดข้อผิดพลาดในการลบข้อมูล', HttpStatus.BAD_REQUEST);
    }
    return { messsage: 'ลบข้อมูลสำเร็จ' };
  }
}
