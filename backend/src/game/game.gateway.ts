import {WebSocketGateway} from '@nestjs/websockets';

@WebSocketGateway(80, {namespace: 'game'})
export class GameGateway {}
