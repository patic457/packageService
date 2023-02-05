import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType('Customer')
export class CustomerType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;
}