import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MainMenuModule} from './main-menu/main-menu.module';
import {LobbyModule} from './lobby/lobby.module';
import {GameModule} from './game/game.module';

@Module({
    imports: [MainMenuModule, LobbyModule, GameModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
