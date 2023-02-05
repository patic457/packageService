import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCustomerDto {
  @IsNotEmpty({ message: 'ชื่อลูกค้าห้ามว่าง' })
  @Field()
  name: string;
}
