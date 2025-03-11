import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { S3FilesService } from 'src/s3-files/s3-files.service';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private s3FileService: S3FilesService
    ){}

    async saveImageData(fileName: string) {
        const imageData = await this.s3FileService.readFile(fileName);
        
        const imageMetaData = this.imageRepository.create({
            // "fileName": imageData.fileName,
            // "size": imageData.size,
            // "mimeType": imageData.mimeType,
            "url": imageData.url
        });

        return this.imageRepository.save(imageMetaData);
    }
}
