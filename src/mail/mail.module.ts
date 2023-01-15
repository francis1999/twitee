import { MailerModule, } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
//import { MailService } from './mail.service';
import { MailController } from './mail.controller';
@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: 'smtp.gmail.com',
        //transportMethod: "SMTP",
        //secureConnection: true,
        port: 465,
        secure: true, 
        auth: {
          user:'gbade.francis@gmail.com',
          pass: 'ogyifoicyjgoorpq',
        },
      /*   tls: {
          rejectUnauthorized: false
      } */
      },
  
      
    }),
    inject: [ConfigService]
  }), ConfigModule.forRoot()],
  controllers: [MailController],
  providers: [],
})
/* @Module({
  imports:[
    MailerModule.forRoot({
    transport: {
      host:'smtp.gmail.com',
      secure:false,
      auth:{
        user:'gbade.francis@gmail.com',
        password:'timilehin123'

      },
      default:{
        from: '"No Reply" <gbade.francis@gmail.com>'
      },
      template:{
        dir:join(__dirname,'templates'),
        adapter: new HandlebarsAdapter(),
        options:{
          strict:true
        }
      }
    }
  })
    ],
  
  providers: [MailService],
  exports:[MailService],
  controllers: [MailController]
})*/
export class MailModule {} 
