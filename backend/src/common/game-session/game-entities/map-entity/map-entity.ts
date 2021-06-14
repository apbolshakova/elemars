import {GameEntity} from '../game-entity';
import {MapEntityType} from './map-entity-type';
import {MapEntitySprite} from './map-entity-sprite';

export interface MapEntity extends GameEntity {
    type: MapEntityType;
    sprite: MapEntitySprite;
}
