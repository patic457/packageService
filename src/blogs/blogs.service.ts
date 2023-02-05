import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

import { writeFile } from 'fs';
import { v4 } from 'uuid';
import { promisify } from 'util';
import * as path from 'path';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto, user: User): Promise<any> {
    const blog = new Blog();
    blog.topic = createBlogDto.topic;
    blog.user = user;
    blog.photo = await this.saveImageToDisk(createBlogDto.photo);// return ชื่อไฟล์พร้อมนามสกุลที่อัปโหลดแล้ว
    await this.blogsRepository.save(blog); 
    return {
      photo: blog.photo,
      message: 'เพิ่ม blog และอัปโหลดไฟล์เรียบร้อย'
    };
  }

  findAll():  Promise<Blog[]> {
    // const blogs = this.blogsRepository.find({
    //   relations: ['user']
    // });
    const blogs = this.blogsRepository
    .createQueryBuilder('blog')
    .innerJoinAndSelect('blog.user', 'user')
    .select(['blog', 'user.id', 'user.fullname'])
    .getMany();

    return blogs;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }

  async saveImageToDisk(baseImage: any) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./');

    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(
      baseImage.indexOf('/') + 1,
      baseImage.indexOf(';base64'),
    );

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
      filename = `${v4()}.svg`;
    } else {
      filename = `${v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let imgData = this.decodeBase64Image(baseImage);
    // console.log(imgData);

    //เขียนไฟล์ไปไว้ที่ path
    const writeFileAsync = promisify(writeFile);
    await writeFileAsync(uploadPath + filename, imgData, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
  }

  decodeBase64Image(base64Str: string) {
    let matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    return matches[2];
  }

}
