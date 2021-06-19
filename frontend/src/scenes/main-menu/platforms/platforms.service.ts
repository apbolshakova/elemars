import {MapAssets} from '../../../common/assets/map-assets/map-assets';
import MainMenuScene from '../main-menu.scene';
import {PlatformType} from '../../../common/platforms/platform-type';

const BIG_PLATFORM_COORDINATES = {
    x: 1700,
    y: 600,
};
const BIG_PLATFORM_FORCED_SCALE = 1.5;
const SMALL_PLATFORM_COORDINATES = {
    x: -300,
    y: 1000,
};

export class PlatformsService {
    constructor(private scene: MainMenuScene, private depth: number) {
        this.createAndAddPlatforms();
    }

    private createAndAddPlatforms(): void {
        this.scene.make.image({
            x: BIG_PLATFORM_COORDINATES.x * this.scene.gameScale,
            y: BIG_PLATFORM_COORDINATES.y * this.scene.gameScale,
            key: MapAssets.platform(PlatformType.BIG).key,
            depth: this.depth,
            origin: {x: 0, y: 0},
            scale: this.scene.gameScale * BIG_PLATFORM_FORCED_SCALE,
            add: true,
        });

        this.scene.make.image({
            x: SMALL_PLATFORM_COORDINATES.x * this.scene.gameScale,
            y: SMALL_PLATFORM_COORDINATES.y * this.scene.gameScale,
            key: MapAssets.platform(PlatformType.SMALL).key,
            depth: this.depth,
            origin: {x: 0, y: 0},
            scale: this.scene.gameScale,
            add: true,
        });
    }
}
