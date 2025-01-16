import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    KnexModule.forRoot({
      config:{
        client:"pg",
        connection:{
          host:"localhost",
          user:"postgresUser",
          password:"password",
          database:"to-do-app"
        }
      }

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
