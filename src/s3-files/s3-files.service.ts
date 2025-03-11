import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UploadFileDto } from './dto/upload.dto';

@Injectable()
export class S3FilesService {
    private s3 = new AWS.S3();

    constructor(){}

    async uploadFile(body: UploadFileDto) {

        const { file, fileName } = body;

        const decodeFile = Buffer.from(file, 'base64');
        const params = {
            Bucket: "ia-bistec-images",
            Key: `/files/${fileName}`,
            Body: decodeFile
        };
        try {
            const responseS3 = await this.s3.upload(params).promise();
            return responseS3;
        } catch (error) {
            throw error;
        }
    }

    async listFiles() {
        const params = {
            Bucket: "ia-bistec-images",
        };
        try {
            const listData = await this.s3.listObjectsV2(params).promise();
            return listData.Contents;
        } catch (error) {
            throw error;
        }
    }

    async readFile(fileName: string) {
        const params = {
            Bucket: "ia-bistec-images",
            Key: `/files/${fileName}`,
        };
        try {
            // const objResponse = await this.s3.headObject(params).promise();
            const urlPicture = this.s3.getSignedUrl("getObject", params);
            return {
                // "fileName": fileName,
                // "size": objResponse.ContentLength,
                // "mimeType": objResponse.ContentType,
                "url": urlPicture
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileName: string) {
        const params = {
            Bucket: "ia-bistec-images",
            Key: `/files/${fileName}`,
        };
        try {
            this.s3.deleteObject(params).promise();
            return true;
        } catch (error) {
            throw error;
        }
    }
}
