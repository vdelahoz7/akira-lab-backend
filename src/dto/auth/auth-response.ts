import { ObjectType, Field } from '@nestjs/graphql';
import { Admin } from '../../entities/admin.entity';

@ObjectType()
export class AuthResponse {
    @Field()
    accessToken: string;

    @Field(() => Admin)
    admin: Admin;
}
