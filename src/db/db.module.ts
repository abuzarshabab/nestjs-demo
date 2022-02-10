import { Module } from '@nestjs/common';
import { DbConnection } from './db.service';

@Module({
  imports: [],
  exports: [DbConnection],
  providers: [DbConnection],
})
export class DbModule {}
