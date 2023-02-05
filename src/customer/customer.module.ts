import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer])
    ],
    providers: [ CustomerResolver, CustomerService ]
})
export class CustomerModule {}
