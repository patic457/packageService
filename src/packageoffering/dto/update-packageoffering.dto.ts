import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageofferingDto } from './create-packageoffering.dto';

export class UpdatePackageofferingDto extends PartialType(CreatePackageofferingDto) {}
