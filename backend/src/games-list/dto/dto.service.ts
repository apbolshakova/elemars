import {Injectable} from '@nestjs/common';
import {Game} from '../../game/game';
import {GameDto, GamesListDto} from './games-list.dto';
import {GameLobbyDto} from './game-lobby.dto';
import {Player} from '../../player/player';

@Injectable()
export class DtoService {
    public mapGamesListToDto(games: Record<string, Game>): GamesListDto {
        const gameListDto = {games: []};

        for (const gameId in games) {
            if (games.hasOwnProperty(gameId)) {
                gameListDto.games.push(this.mapGameToDto(gameId, games[gameId]));
            }
        }

        return gameListDto;
    }

    public mapGameToDto(gameId: string, game: Game): GameDto {
        return {
            ...this.mapPlayersToGameLobbyDto(game.joinedPlayers),
            id: gameId,
            title: game.title,
            status: game.status,
            mode: game.mode,
        };
    }

    public mapPlayersToGameLobbyDto(players: Player[]): GameLobbyDto {
        return {
            takenCharacters: players.map((player: Player) => player.character),
        };
    }
}
