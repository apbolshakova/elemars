import * as io from '../plugins/socket.io';
import {GamesListDto} from '../../../backend/src/games-list/dto/games-list.dto';

export class SocketService {
    private socket: any;

    constructor() {
        this.socket = io('http://localhost:3000');
        this.init();
    }

    private init() {
        // TODO реализовать все по мере разработки + исходящие
        this.socket.on('connectSuccess', SocketService.onConnectSuccess.bind(this));
        this.socket.on('connectFail', SocketService.onConnectFail.bind(this));
        // this.socket.on('createGameSuccess', this.onCreateGameSuccess.bind(this));
        // this.socket.on('createGameFail', this.onCreateGameFail.bind(this));
        // this.socket.on('updateGamesList', this.onUpdateGamesList.bind(this));
        // this.socket.on('joinSuccess', this.onJoinSuccess.bind(this));
        // this.socket.on('joinFail', this.onJoinFail.bind(this));
        // this.socket.on('leaveSuccess', this.onLeaveSuccess.bind(this));
        // this.socket.on('updateGameLobby', this.onUpdateGameLobby.bind(this));
        // this.socket.on('updateGame', this.onUpdateGame.bind(this));
    }

    private static onConnectSuccess(gamesListDto: GamesListDto): void {
        console.log('connect Success ' + gamesListDto.games.length);
    }

    private static onConnectFail(errorMessage: Error): void {
        console.log('connect Fail ' + errorMessage);
    }

    // private onAllPlayers(players: string) {
    //     this.players = new Map(JSON.parse(players));
    // }
    //
    // getPlayers(): Map<string, Player> {
    //     return this.players;
    // }
    //
    // getPlayer(): Player {
    //     return this.players.get(this.socket.id);
    // }
    //
    // // from client
    // // from client
    // updatePlayer(won: string, lose: string) {
    //     this.socket.emit('updatePlayer', {
    //         won,
    //         lose,
    //     });
    //     this.players.delete(lose);
    // }
    //
    // updatePositionCoin() {
    //     this.socket.emit('updatePositionCoin');
    // }
    //
    // updateScore(player: Player, type: string): void {
    //     this.socket.emit('updateScore', {player, type});
    // }
    //
    // updatePositionPlayer(x: number, y: number): void {
    //     if (this.getPlayer() && (this.getPlayer().x !== x || this.getPlayer().y !== y)) {
    //         let player: Player = this.getPlayer();
    //         player.x = x;
    //         player.y = y;
    //         this.socket.emit('updatePositionPlayer', player);
    //     }
    // }
    //
    // setAPI(api: any): void {
    //     this.api = api;
    // }
    //
    // // to client
    // // to client
    // private onPositionCoin(data: any): void {
    //     this.api.setCoinPosition(data.x, data.y);
    // }
    //
    // private onReloadScore(data: any): void {
    //     let player: Player = this.players.get(data.id);
    //     player.score = data.score;
    //     console.log('onReloadScore', data);
    //     if (data.crazy) {
    //         this.api.runCrazy(data.id);
    //     }
    //     this.api.setTextScore(player);
    // }
    //
    // private onReloadPlayer(value: string): void {
    //     let player: Player = JSON.parse(value);
    //     if (this.api && player) {
    //         this.players.set(player.id, player);
    //         this.api.reloadPlayer(player.id, player);
    //     }
    // }
    //
    // private onAddPlayer(value: string) {
    //     let player: Player = JSON.parse(value);
    //     console.log('add player', player.id);
    //     this.players.set(player.id, player);
    //     if (this.api) {
    //         this.api.addPlayer(player.id, player);
    //     }
    // }
    //
    // private onRemovePlayer(id: string) {
    //     if (this.api && this.players.get(id)) {
    //         console.log('remove player', id);
    //         this.api.removePlayer(id);
    //         this.players.delete(id);
    //     }
    // }
}
