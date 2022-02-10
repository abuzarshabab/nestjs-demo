import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [AuthModule, SocialModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
