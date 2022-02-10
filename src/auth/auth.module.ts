import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AuthController } from './auth.controller';
import { AuthRepo } from './auth.repo';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [DbModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepo, LocalStrategy],
})
export class AuthModule {}
