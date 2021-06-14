import {Injectable} from '@nestjs/common';

@Injectable() // TODO удалить
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
