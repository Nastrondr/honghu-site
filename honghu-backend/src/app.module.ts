import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompetitionsModule } from './modules/competitions/competitions.module';
import { CmsModule } from './modules/cms/cms.module';
import { HealthModule } from './modules/health/health.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { TeamModule } from './modules/team/team.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { WorksModule } from './modules/works/works.module';
import { ReviewModule } from './modules/review/review.module';

import {
  HttpExceptionFilter,
} from './common';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CommonModule,
    AuthModule,
    UsersModule,
    CompetitionsModule,
    CmsModule,
    HealthModule,
    EnrollmentModule,
    TeamModule,
    ResourcesModule,
    WorksModule,
    ReviewModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
