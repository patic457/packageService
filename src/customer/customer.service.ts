import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private customerRepository: Repository<Customer>
    ) {}

    async create(createCustomerDto: CreateCustomerDto) {
        const cust = new Customer();
        cust.name = createCustomerDto.name;
        return await this.customerRepository.save(cust);
    }

    async findAll() {
        return await this.customerRepository.find();
    }
}
