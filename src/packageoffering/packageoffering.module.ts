import { Module } from '@nestjs/common';
import { PackageofferingService } from './packageoffering.service';
import { PackageofferingController } from './packageoffering.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packageoffering } from './entities/packageoffering.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Packageoffering])],
  controllers: [PackageofferingController],
  providers: [PackageofferingService]
})
export class PackageofferingModule {}
