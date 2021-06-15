import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {PlayerService} from './player.service';
import {Socket} from 'socket.io';

@WebSocketGateway(80, {namespace: 'player'})
export class PlayerGateway {
    constructor(private playerService: PlayerService) {}

    @SubscribeMessage('connect')
    handleConnection(client: Socket) {
        this.playerService.registerNewPlayer(client);

        if (!this.playerService.isPlayerExist(client.id)) {
            client.emit('connectFail', Error('Не удалось сохранить игрока в системе.'));
            return;
        }

        client.emit('connectSuccess'); // TODO отправить новому игрокуы информацию об уже созданных играх
    }

    @SubscribeMessage('disconnect')
    handleDisconnection(client: Socket) {
        this.playerService.disconnectPlayer(client.id);
    }
}
