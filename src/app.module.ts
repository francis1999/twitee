import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
 

@Module({
  imports: [AuthModule, PrismaModule, MailModule,ConfigModule.forRoot({
    isGlobal:true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
