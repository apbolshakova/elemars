import {PlatformType} from '../../platforms/platform-type';
import {MapAsset} from './map-asset';

export class MapAssets {
    static get background(): MapAsset {
        return {
            key: 'background',
            path: 'src/assets/img/map/background.jpg',
            numOfTypes: 1,
        };
    }
    static cloud(i?: number): MapAsset {
        return {
            key: 'cloud' + i,
            path: 'src/assets/img/map/clouds/cloud' + i + '.png',
            numOfTypes: 4,
        };
    }
    static platform(i?: number): MapAsset {
        return {
            key: 'platform' + i,
            path: 'src/assets/img/map/platforms/platform' + i + '.png',
            numOfTypes: Object.keys(PlatformType).length / 2,
        };
    }
}
