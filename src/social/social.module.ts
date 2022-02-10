import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { DbModule } from 'src/db/db.module';
import { SocialRepo } from './social.repo';

@Module({
  imports: [DbModule],
  providers: [SocialService, SocialRepo],
  controllers: [SocialController],
})
export class SocialModule {}
