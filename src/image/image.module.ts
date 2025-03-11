import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { S3FilesService } from 'src/s3-files/s3-files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image])
  ],
  controllers: [ImageController],
  providers: [ImageService, S3FilesService]
})
export class ImageModule {}
