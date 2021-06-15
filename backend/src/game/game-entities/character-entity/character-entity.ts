import {GameEntity} from '../game-entity';
import {CharacterEntityAnimation} from './character-entity-animation';

export interface CharacterEntity extends GameEntity {
    socketId: string;
    currentAnimation: CharacterEntityAnimation;
}
