import { Module } from '@nestjs/common';
import { NewsController, ExpertController, PartnerController, HomeController } from './news.controller';
import { NewsService } from './news.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NewsController, ExpertController, PartnerController, HomeController],
  providers: [NewsService],
  exports: [NewsService],
})
export class CmsModule {}
