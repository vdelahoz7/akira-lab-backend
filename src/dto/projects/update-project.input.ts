import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectInput } from './create-project.input';

export class UpdateProjectInput extends PartialType(CreateProjectInput) { }
