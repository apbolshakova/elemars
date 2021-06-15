import {Injectable} from '@nestjs/common';
import {Player} from '../player/player';
import {PlayerStatus} from '../player/player-status';
import {Game} from '../game/game';
import {GameMode} from '../game/game-mode';
import {GameStatus} from '../game/game-status';
import {Character} from '../game/game-entities/character-entity/character';

@Injectable()
export class GamesListService {
    private games: Record<string, Game>;

    public createNewGame(
        gameId: string,
        title: string,
        mode: GameMode,
        gameHost: Player,
    ): void {
        this.games[gameId] = {
            title,
            status: GameStatus.IN_LOBBY,
            mode,
            gameHost,
            joinedPlayers: <Player[]>[],
        };
    }

    public deleteGame(gameId: string): void {
        // TODO отключить игроков от удаляемой игры
        delete this.games[gameId];
    }

    public getGame(gameId: string): Game | undefined {
        return this.games[gameId];
    }

    public isGameExist(gameId: string): boolean {
        return !!this.getGame(gameId);
    }

    public addPlayerToGame(gameId: string, player: Player, character: Character): void {
        player.status = PlayerStatus.IN_LOBBY;
        player.character = character;

        this.getGame(gameId).joinedPlayers.push(player);
    }
}
