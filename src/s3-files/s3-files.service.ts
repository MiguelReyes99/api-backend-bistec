import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { error } from 'console';

@Injectable()
export class S3FilesService {
    private s3 = new AWS.S3();
    private readonly bucketName = process.env.AWS_BUCKET;

    constructor(){}

    async uploadFile(file: Express.Multer.File , fileName: string) {
        if (this.bucketName == undefined) {
            throw error("Bucket name is not defined");
        }
        const params = {
            Bucket: this.bucketName,
            Key: `${fileName}`,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        try {
            const responseS3 = await this.s3.upload(params).promise();
            return responseS3;
        } catch (error) {
            throw error;
        }
    }

    async listFiles() {
        if (this.bucketName == undefined) {
            throw error("Bucket name is not defined");
        }
        const params = {
            Bucket: this.bucketName,
        };
        try {
            const listData = await this.s3.listObjectsV2(params).promise();
            return listData.Contents;
        } catch (error) {
            throw error;
        }
    }

    async readFile(fileName: string) {
        if (this.bucketName == undefined) {
            throw error("Bucket name is not defined");
        }
        const params = {
            Bucket: this.bucketName,
            Key: `${fileName}`,
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
        if (this.bucketName == undefined) {
            throw error("Bucket name is not defined");
        }
        const params = {
            Bucket: "ia-bistec-images",
            Key: `${fileName}`,
        };
        try {
            this.s3.deleteObject(params).promise();
            return true;
        } catch (error) {
            throw error;
        }
    }
}