import {GameEntity} from '../game-entity';
import {CharacterEntityType} from './character-entity-type';
import {CharacterEntitySprite} from './character-entity-sprite';

export interface CharacterEntity extends GameEntity {
    socketId: string;
    type: CharacterEntityType;
    sprite: CharacterEntitySprite;
}
