import {Key} from 'ts-keycode-enum';
import {Socket} from 'socket.io';
import {PlayerStatus} from './player-status';

export interface Player {
    socket: Socket;
    status: PlayerStatus;
    pressedKeys: Key[];
}
