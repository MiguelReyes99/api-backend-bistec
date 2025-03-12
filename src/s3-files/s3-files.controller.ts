import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response, Express } from 'express';
import { S3FilesService } from './s3-files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/s3Files')
export class S3FilesController {
    constructor(
        private readonly s3FileService: S3FilesService
    ){}
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('fileName') fileName: string, @Res() res: Response) {
        try {
            const response = await this.s3FileService.uploadFile(file, fileName);
            res.status(HttpStatus.OK).send(response);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
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