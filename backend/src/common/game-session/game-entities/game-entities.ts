import {CharacterEntity} from './character-entity/character-entity';
import {MapEntities} from './map-entities/map-entities';

export interface GameEntities {
    characterEntities: CharacterEntity[];
    mapEntities: MapEntities;
}
