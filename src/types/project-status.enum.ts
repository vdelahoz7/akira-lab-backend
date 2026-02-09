import { registerEnumType } from '@nestjs/graphql';

export enum ProjectStatus {
    IN_PROGRESS = 'En progreso',
    REVIEW = 'Revisión',
    COMPLETED = 'Finalizado',
}

registerEnumType(ProjectStatus, {
    name: 'ProjectStatus',
});
