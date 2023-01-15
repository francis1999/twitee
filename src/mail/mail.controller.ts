import { Body, Controller, Get, Post, Query } from "@nestjs/common";
//import { MailService } from "./mail.service";
import { MailerService } from "@nestjs-modules/mailer";

@Controller("mail")
export class MailController {
    constructor(private mailService: MailerService) {}

    @Post('plain-text-email')
    async plainTextEmail(@Body('email') email) {
    var response = await this.mailService.sendMail({
     to:email,
     from:"gbade1988@gmail.com",
     subject: 'Plain Text Email',
     text: 'Welcome NestJS Email Sending Tutorial', 
    });

    return response;
  }
} 