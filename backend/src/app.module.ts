import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MainMenuModule} from './main-menu/main-menu.module';
import {LobbyModule} from './lobby/lobby.module';
import {GameLogicModule} from './game-logic/game-logic.module';

@Module({
    imports: [MainMenuModule, LobbyModule, GameLogicModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
