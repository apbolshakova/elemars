import {MapEntity} from './map-entity';

export interface MapEntities {
    ground: MapEntity[];
    water: MapEntity[];
    platforms: MapEntity[];
    obstacles: MapEntity[];
}
