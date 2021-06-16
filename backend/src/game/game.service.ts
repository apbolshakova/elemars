import {Injectable} from '@nestjs/common';
import {Game} from './game';
import {CharacterEntity} from './game-entities/character-entity/character-entity';

@Injectable()
export class GameService {
    public deleteCharacterEntity(game: Game, socketId: string): void {
        game.gameEntities.characterEntities = game.gameEntities.characterEntities.filter(
            (characterEntity: CharacterEntity) => characterEntity.socketId !== socketId,
        );
    }
}
