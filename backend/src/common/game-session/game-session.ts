import {GameStatus} from './game-status';
import {GameMode} from './game-mode';
import {Player} from '../player/player';
import {GameEntities} from './game-entities/game-entities';

export interface GameSession {
    id: string;
    status: GameStatus;
    mode: GameMode;
    gameHost: Player;
    joinedPlayers: Player[];
    gameObjects?: GameEntities;
}
