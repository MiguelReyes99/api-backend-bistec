import { Controller, Param, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('api/v1/images')
export class ImageController {
    constructor(private readonly imageService: ImageService){}

    @Post(":fileName")
    async saveMetaData(@Param("fileName") fileName: string) {
        return this.imageService.saveImageData(fileName);
    }
}

