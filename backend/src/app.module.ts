import {Module} from '@nestjs/common';
import {PlayerGateway} from './player/player.gateway';
import {PlayerService} from './player/player.service';
import {GamesListService} from './games-list/games-list.service';
import {GamesListGateway} from './games-list/games-list.gateway';
import {GameService} from './game/game.service';
import {GameGateway} from './game/game.gateway';

@Module({
    imports: [],
    providers: [
        PlayerService,
        PlayerGateway,
        GamesListService,
        GamesListGateway,
        GameService,
        GameGateway,
    ],
})
export class AppModule {}
