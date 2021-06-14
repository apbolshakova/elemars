import {GameEntity} from '../game-entity';
import {Character} from './character';
import {CharacterEntityAnimation} from './character-entity-animation';

export interface CharacterEntity extends GameEntity {
    socketId: string;
    character: Character;
    currentAnimation: CharacterEntityAnimation;
}
