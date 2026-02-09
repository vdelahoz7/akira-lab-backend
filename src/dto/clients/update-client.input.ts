import { PartialType } from '@nestjs/mapped-types';
import { CreateClientInput } from './create-client.input';

export class UpdateClientInput extends PartialType(CreateClientInput) { }
