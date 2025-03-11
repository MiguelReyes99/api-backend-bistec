import { Module } from '@nestjs/common';
import { S3FilesController } from './s3-files.controller';
import { S3FilesService } from './s3-files.service';

@Module({
  controllers: [S3FilesController],
  providers: [S3FilesService]
})
export class S3FilesModule {}
