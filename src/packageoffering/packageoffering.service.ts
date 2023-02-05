import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePackageofferingDto } from './dto/create-packageoffering.dto';
import { UpdatePackageofferingDto } from './dto/update-packageoffering.dto';
import { Packageoffering } from './entities/packageoffering.entity';

import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';

import axios from 'axios';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PackageofferingService {
  constructor(
    @InjectRepository(Packageoffering)
    private PackageofferingRepository: Repository<Packageoffering>,
  ) {}

  async getCategory() {
    const url = 'https://patic457.000webhostapp.com/api/getcategory.php';
    // return this.http
    //   .get('https://patic457.000webhostapp.com/api/category.php')
    //   .pipe(
    //     map((res) => res.data?.bpi),
    //     map((bpi) => bpi?.USD),
    //     map((usd) => {
    //       return usd?.rate;
    //     }),
    //   )
    //   .pipe(
    //     catchError(() => {
    //       throw new ForbiddenException('API not available');
    //     }),
    //   );
    const response = await axios.get(url);
    return plainToClass(Packageoffering, response.data);
  }

  async getCatalog() {
    const url = 'https://patic457.000webhostapp.com/api/getcatalog.php';
    const response = await axios.get(url);
    return plainToClass(Packageoffering, response.data);
  }

  async getProductOffering() {
    const url = 'https://patic457.000webhostapp.com/api/getproductoffering.php';
    const response = await axios.get(url);
    return plainToClass(Packageoffering, response.data);
  }

  findAll() {
    return `This action returns all packageoffering`;
  }

  async findOne(id: number): Promise<Packageoffering> {
    const user = await this.PackageofferingRepository.findOne(id);
    if (!user) {
      throw new HttpException('ไม่พบข้อมูลนี้ในระบบ', HttpStatus.NOT_FOUND); // 404
    }
    return user;
  }

  create(createPackageofferingDto: CreatePackageofferingDto) {
    return 'This action adds a new packageoffering';
  }

  update(id: number, updatePackageofferingDto: UpdatePackageofferingDto) {
    return `This action updates a #${id} packageoffering`;
  }

  remove(id: number) {
    return `This action removes a #${id} packageoffering`;
  }
}
