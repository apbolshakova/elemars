import {Key} from 'ts-keycode-enum';
import {Socket} from 'socket.io';
import {PlayerStatus} from './player-status';
import {Character} from '../game/game-entities/character-entity/character';

export interface Player {
    socket: Socket;
    status: PlayerStatus;
    character?: Character;
    score?: number;
    pressedKeys?: Key[];
}
