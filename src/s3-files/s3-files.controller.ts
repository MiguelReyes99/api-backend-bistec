import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UploadFileDto } from './dto/upload.dto';
import { Response } from 'express';
import { S3FilesService } from './s3-files.service';

@Controller('api/v1/s3Files')
export class S3FilesController {
    constructor(
        private readonly s3FileService: S3FilesService
    ){}
    
    @Post('upload')
    async uploadFile(@Body() body: UploadFileDto, @Res() res: Response) {
        try {
            const response = await this.s3FileService.uploadFile(body);
            res.status(HttpStatus.OK).send(response);
        } catch (error) {
            throw error;
        }
    }

    @Get('list')
    async listFiles() {
        return this.s3FileService.listFiles();
    }

    @Get(':fileName')
    async readFile(@Param('fileName') fileName: string) {
        const objPicture = await this.s3FileService.readFile(fileName);
        return objPicture;
    }

    @Delete(':fileName')
    async deleteFile(@Param('fileName') fileName: string) {
        return this.s3FileService.deleteFile(fileName);
    }
}
