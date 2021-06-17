import {Module} from '@nestjs/common';
import {PlayerGateway} from './player/player.gateway';
import {PlayerService} from './player/player.service';
import {GamesListService} from './games-list/games-list.service';
import {GamesListGateway} from './games-list/games-list.gateway';
import {GameService} from './game/game.service';
import {GameGateway} from './game/game.gateway';
import {DtoService} from './games-list/dto/dto.service';

@Module({
    imports: [],
    providers: [
        PlayerService,
        PlayerGateway,
        GamesListService,
        GamesListGateway,
        GameService,
        GameGateway,
        DtoService,
    ],
})
export class AppModule {}
