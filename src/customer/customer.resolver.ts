import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CustomerService } from "./customer.service";
import { CustomerType } from "./customer.type";
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Resolver(() => CustomerType)
export class CustomerResolver {
    constructor(private readonly customerService: CustomerService) {}

    @Query(() => [CustomerType])
    customer() {
        return this.customerService.findAll();
    }

    @Mutation(() => CustomerType)
    createCustomer(@Args('createCustomerDto') createCustomerDto: CreateCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }
}