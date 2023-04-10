import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {

    createImage(file): string {
        if (file === undefined) {
            return null;
        }
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuidv4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            if(!fs.existsSync(path.resolve(__dirname, '..', 'static', 'images'))) {
                fs.mkdirSync(path.resolve(__dirname, '..', 'static', 'images'), {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePath, 'images', fileName), file.buffer)
            return fileName;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeImage(fileName: string) {

    }

}
