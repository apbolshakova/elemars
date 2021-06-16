import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {GamesListService} from './games-list.service';
import {GameMode} from '../game/game-mode';
import {Character} from '../game/game-entities/character-entity/character';
import {generateId} from './id-generation';
import {PlayerService} from '../player/player.service';
import {Player} from '../player/player';
import {PlayerStatus} from '../player/player-status';
import {Game} from '../game/game';
import {GameStatus} from '../game/game-status';

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
    ): void {
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
            this.gamesListService.getGame(newGameId),
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

        this.emitGameListUpdate();
    }

    @SubscribeMessage('joinGame')
    handleGameJoining(
        client: Socket,
        joinGameDto: {
            gameId: string;
            character: Character;
        },
    ): void {
        if (!!this.playerService.isPlayerExist(client.id)) {
            client.emit(
                'joinFail',
                Error('Не удалось найти подключающегося игрока в системе.'),
            );
        }

        const player: Player = this.playerService.getPlayer(client.id);

        if (!!this.gamesListService.isGameExist(joinGameDto.gameId)) {
            client.emit('joinFail', Error('Попытка подключение к несуществующей игре.'));
        }

        const game: Game = this.gamesListService.getGame(joinGameDto.gameId);

        if (game.status !== GameStatus.IN_LOBBY) {
            client.emit('joinFail', Error('Попытка подключения к начатой игре.'));
        }

        if (!this.gamesListService.isCharacterAvailable(game, joinGameDto.character)) {
            client.emit('joinFail', Error('Попытка выбрать занятого персонажа.'));
        }

        this.gamesListService.addPlayerToGame(game, player, joinGameDto.character);

        if (player.status !== PlayerStatus.IN_LOBBY) {
            client.emit('joinFail', Error('Не удалось изменить статус игрока.'));
        }

        client.emit('joinSuccess');

        this.emitGameListUpdate();
        this.emitGamePlayersUpdate();
    }

    @SubscribeMessage('leaveGame')
    handleGameLeaving(
        client: Socket,
        leaveGameDto: {
            gameId: string;
        },
    ): void {
        if (!!this.playerService.isPlayerExist(client.id)) {
            return;
        }

        const player: Player = this.playerService.getPlayer(client.id);

        this.gamesListService.deletePlayerFromGame(leaveGameDto.gameId, player);

        client.emit('leaveSuccess');

        if (!!this.gamesListService.isGameExist(leaveGameDto.gameId)) {
            return;
        }

        const game: Game = this.gamesListService.getGame(leaveGameDto.gameId);

        if (game.status === GameStatus.IN_LOBBY) {
            this.emitGameListUpdate();
        }

        this.emitGamePlayersUpdate();
    }

    private emitGameListUpdate() {
        this.playerService
            .getPlayersByStatus(PlayerStatus.IN_MAIN_MENU)
            .map((player: Player) => player.socket.emit('updateGamesList')); // TODO прокидывать информацию обо всех играх в главном меню
    }

    private emitGamePlayersUpdate() {
        // TODO прокидывать на всех игроков подключенных к данной игре информацию о них
    }
}
