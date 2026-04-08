import { Module } from '@nestjs/common';
import { EnrollmentController, AdminEnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EnrollmentController, AdminEnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
