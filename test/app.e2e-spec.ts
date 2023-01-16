import { INestApplication,ValidationPipe } from "@nestjs/common";
//import { ValidationPipe } from "@nestjs/common/pipes";
import { Test } from "@nestjs/testing";
import * as pactum from 'pactum'
//import { describe } from "node:test";
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { AuthDto } from "src/auth/dto";

describe('App e2e', ()=>{
  let app: INestApplication;
  let prisma:PrismaService
  beforeAll(async()=>{
     const moduleRef=
     await Test.createTestingModule({
      imports:[AppModule]
     }).compile();
     app=moduleRef.createNestApplication();
     
     app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true,
      }),
      
     );
     await app.init();
     await app.listen(3001)
     prisma=app.get(PrismaService)
     await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });



describe('Auth',()=>{
  describe('Signup', ()=>{
    it('should sign up',()=>{
      const dto: AuthDto={
        email:'gbade19882@gmail.com',
        password: 'password12345',
        name:'gbade francis',
        userName:'gbade19882',
      }
      return pactum.spec()
      .post(
        'http://localhost:3001/api/auths/sign-up',
      )
      .withBody(dto)
      .expectStatus(201)
      .inspect()
      //.expectStatus(201)
    });
  });
 /*  describe('Signin',()=>{
    it.todo('should Sign in');
  });
  describe('Get me',()=>{
    it.todo('should Get User profile');
  }); */

});
/* describe('Twits',()=>{
  describe('Post Twits',()=>{
    it.todo('should Post Twit');
  })
  describe('Comment',()=>{
    it.todo('should Comment');
  })
  describe('Like twits',()=>{
    it.todo('should Like twits');
  })
  describe('Edit twit',()=>{
    it.todo('should Edit twit');
  }) */
/*   describe('Delete twit',()=>{
    it.todo('should Delete twit');
  }) */
});

 /*  it.todo('should pass'); */
