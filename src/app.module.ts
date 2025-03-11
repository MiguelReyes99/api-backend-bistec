import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { S3FilesService } from './s3-files/s3-files.service';
import { S3FilesModule } from './s3-files/s3-files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './image/image.module';
import { Image } from './image/entity/image.entity';
import { ImageService } from './image/image.service';
import { Repository } from 'typeorm';

@Module({
  imports: [
    S3FilesModule,
    // ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   "type": "mysql",
    //   "host": process.env.DB_HOST,
    //   "port": 3306,
    //   "username": process.env.DB_USERNAME,
    //   "password": process.env.DB_PASSWORD,
    //   "database": process.env.DB_NAME,
    //   "entities": ["dist/**/*.entity{.ts,.js}"],
    //   "synchronize": true
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
