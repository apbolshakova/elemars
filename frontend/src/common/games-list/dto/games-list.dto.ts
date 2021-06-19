import {GameStatus} from '../../game/game-status';
import {GameMode} from '../../game/game-mode';
import {GameLobbyDto} from './game-lobby.dto';

export interface GameDto extends GameLobbyDto {
    id: string;
    title: string;
    status: GameStatus;
    mode: GameMode;
}

export interface GamesListDto {
    games: GameDto[];
}
