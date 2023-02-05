import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { BlogsModule } from './blogs/blogs.module';
import { Blog } from './blogs/entities/blog.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlModule } from './gql/gql.module';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { PackageofferingModule } from './packageoffering/packageoffering.module';
import { Packageoffering } from './packageoffering/entities/packageoffering.entity';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10000,
    }),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),

    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASSWORD,
      // database: 'nestdb',

      type: 'sqlite',
      database: './app.sqlite',
      logging: true,

      entities: [User, Blog, Customer, Packageoffering],
      synchronize: true,
    }),
    UsersModule,
    BlogsModule,
    AuthModule,
    GqlModule,
    CustomerModule,
    PackageofferingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
