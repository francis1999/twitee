import { Module } from '@nestjs/common';
import { TwitController } from './twit.controller';
import { TwitService } from './twit.service';

@Module({
  controllers: [TwitController],
  providers: [TwitService]
})
export class TwitModule {}
