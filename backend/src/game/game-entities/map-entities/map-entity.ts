import {GameEntity} from '../game-entity';
import {MapEntityType} from './map-entity-type';

export interface MapEntity extends GameEntity {
    type: MapEntityType; // Спрайт определяется типом
}
