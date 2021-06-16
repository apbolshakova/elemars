import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {PlayerService} from './player.service';
import {Socket} from 'socket.io';
import {PlayerStatus} from './player-status';
import {Player} from './player';
import {GamesListGateway} from '../games-list/games-list.gateway';
import {GamesListService} from '../games-list/games-list.service';

@WebSocketGateway(80, {namespace: 'player'})
export class PlayerGateway {
    constructor(
        private playerService: PlayerService,
        private gamesListService: GamesListService,
        private gamesListGateway: GamesListGateway,
    ) {}

    @SubscribeMessage('connect')
    handleConnection(client: Socket) {
        this.playerService.registerNewPlayer(client);

        if (!this.playerService.isPlayerExist(client.id)) {
            client.emit('connectFail', Error('Не удалось сохранить игрока в системе.'));
            return;
        }

        client.emit('connectSuccess'); // TODO отправить новому игроку информацию об уже созданных играх
    }

    @SubscribeMessage('disconnect')
    handleDisconnection(client: Socket): void {
        if (!this.playerService.isPlayerExist(client.id)) {
            return;
        }

        const player: Player = this.playerService.getPlayer(client.id);

        if (player?.status !== PlayerStatus.IN_MAIN_MENU) {
            const gameIdPlayerJoined: string | undefined =
                this.gamesListService.getGameIdByPlayer(player);
            if (gameIdPlayerJoined) {
                this.gamesListGateway.handleGameLeaving(client, {
                    gameId: gameIdPlayerJoined,
                });
            }
        }

        this.playerService.deletePlayer(client.id);
    }
}
