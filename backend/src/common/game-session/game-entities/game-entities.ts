import {CharacterEntity} from './character-entity/character-entity';
import {MapEntity} from './map-entity/map-entity';

export interface GameEntities {
    characterEntities: CharacterEntity[];
    mapEntities: MapEntity[];
}
