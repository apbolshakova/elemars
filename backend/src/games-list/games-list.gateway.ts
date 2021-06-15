import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {GamesListService} from './games-list.service';
import {GameMode} from '../game/game-mode';
import {Character} from '../game/game-entities/character-entity/character';
import {generateId} from './id-generation';
import {PlayerService} from '../player/player.service';
import {Player} from '../player/player';
import {PlayerStatus} from '../player/player-status';

@WebSocketGateway(80, {namespace: 'games-list'})
export class GamesListGateway {
    constructor(
        private gamesListService: GamesListService,
        private playerService: PlayerService,
    ) {}

    @SubscribeMessage('createGame')
    handleGameCreation(
        client: Socket,
        createGameDto: {
            title: string;
            mode: GameMode;
            character: Character;
        },
    ) {
        const newGameId: string = generateId();
        const hostPlayer: Player = this.playerService.getPlayer(client.id);

        this.gamesListService.createNewGame(
            newGameId,
            createGameDto.title,
            createGameDto.mode,
            hostPlayer,
        );

        if (!this.gamesListService.isGameExist(newGameId)) {
            client.emit('createGameFail', Error('Не удалось создать игру.'));
        }

        this.gamesListService.addPlayerToGame(
            newGameId,
            hostPlayer,
            createGameDto.character,
        );

        if (hostPlayer.status !== PlayerStatus.IN_LOBBY) {
            this.gamesListService.deleteGame(newGameId);

            client.emit(
                'createGameFail',
                Error('Не удалось подключится к игре после её создания.'),
            );
        }

        client.emit('createGameSuccess', {
            gameId: newGameId,
        });

        this.playerService
            .getPlayersByStatus(PlayerStatus.IN_MAIN_MENU)
            .map((player: Player) => player.socket.emit('updateGamesList')); // TODO прокидывать информацию обо всех играх в главном меню
    }
}
