import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {PlayerService} from './player.service';
import {Socket} from 'socket.io';

@WebSocketGateway(80, {namespace: 'player'})
export class PlayerGateway {
    constructor(private playerService: PlayerService) {}

    @SubscribeMessage('connect')
    handleConnection(client: Socket) {
        this.playerService.registerNewPlayer(client);
        if (this.playerService.isPlayerExist(client.id)) {
            client.emit('connectSuccess'); // TODO отправлять информацию о созданных играх
            return;
        }

        client.emit('connectFail', Error('Не удалось сохранить игрока в системе.'));
    }

    @SubscribeMessage('disconnect')
    handleDisconnection(client: Socket) {
        this.playerService.disconnectPlayer(client.id);
    }
}
