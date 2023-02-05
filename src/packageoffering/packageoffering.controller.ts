import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PackageofferingService } from './packageoffering.service';
import { CreatePackageofferingDto } from './dto/create-packageoffering.dto';
import { UpdatePackageofferingDto } from './dto/update-packageoffering.dto';

@Controller('packageoffering')
export class PackageofferingController {
  constructor(
    private readonly packageofferingService: PackageofferingService,
  ) {}

  @Post()
  create(@Body() createPackageofferingDto: CreatePackageofferingDto) {
    return this.packageofferingService.create(createPackageofferingDto);
  }

  @Get()
  findAll() {
    return this.packageofferingService.findAll();
  }

  @Get('/getcategory')
  findCatalog() {
    // findOne(@Param('id') id: string) {
    // return this.packageofferingService.findOne(+id);
    return this.packageofferingService.getCatalog();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePackageofferingDto: UpdatePackageofferingDto,
  ) {
    return this.packageofferingService.update(+id, updatePackageofferingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageofferingService.remove(+id);
  }
}
