import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule,MongooseModule.forRoot('mongodb+srv://mohamadtalemsi:FzuJnCis9uXPeMNP@nestproject.7qpvmqh.mongodb.net/NestProject?retryWrites=true&w=majority&appName=NestProject', {
  }), CategoriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
