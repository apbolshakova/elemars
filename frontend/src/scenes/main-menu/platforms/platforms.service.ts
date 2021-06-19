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
    private platforms?: Phaser.GameObjects.Group;

    constructor(private scene: MainMenuScene, private depth: number) {}

    public initPlatforms(): void {
        this.platforms = this.scene.add.group();
        this.createAndAddPlatforms();
    }

    private createAndAddPlatforms() {
        const bigPlatform: Phaser.GameObjects.Image = this.scene.make.image({
            x: BIG_PLATFORM_COORDINATES.x * this.scene.gameScale,
            y: BIG_PLATFORM_COORDINATES.y * this.scene.gameScale,
            key: MapAssets.platform(PlatformType.BIG).key,
            depth: this.depth,
            origin: {x: 0, y: 0},
            scale: this.scene.gameScale * BIG_PLATFORM_FORCED_SCALE,
            add: true,
        });

        const smallPlatform: Phaser.GameObjects.Image = this.scene.make.image({
            x: SMALL_PLATFORM_COORDINATES.x * this.scene.gameScale,
            y: SMALL_PLATFORM_COORDINATES.y * this.scene.gameScale,
            key: MapAssets.platform(PlatformType.SMALL).key,
            depth: this.depth,
            origin: {x: 0, y: 0},
            scale: this.scene.gameScale,
            add: true,
        });

        this.platforms?.addMultiple([bigPlatform, smallPlatform]);
    }
}
