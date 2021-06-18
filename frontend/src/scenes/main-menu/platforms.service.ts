import {Assets} from '../../common/assets';
import MainMenuScene from './main-menu.scene';

const BIG_PLATFORM_COORDINATES = {
    x: 1900,
    y: 600,
};

const SMALL_PLATFORM_COORDINATES = {
    x: -300,
    y: 1000,
};

export class PlatformsService {
    private platforms?: Phaser.GameObjects.Group;

    constructor(private scene: MainMenuScene, private depth: number) {}

    public initPlatforms(): void {
        this.platforms = this.scene.add.group();
        this.createAndAddNewPlatforms();
    }

    private createAndAddNewPlatforms() {
        const bigPlatform: Phaser.GameObjects.Image = this.scene.make.image({
            x: BIG_PLATFORM_COORDINATES.x * this.scene.gameScale,
            y: BIG_PLATFORM_COORDINATES.y * this.scene.gameScale,
            key: Assets.platform(1).key,
            depth: this.depth,
            origin: {x: 0, y: 0},
            scale: this.scene.gameScale,
            add: true,
        });

        const smallPlatform: Phaser.GameObjects.Image = this.scene.make.image({
            x: SMALL_PLATFORM_COORDINATES.x * this.scene.gameScale,
            y: SMALL_PLATFORM_COORDINATES.y * this.scene.gameScale,
            key: Assets.platform(2).key,
            depth: this.depth,
            origin: {x: 0, y: 0},
            scale: this.scene.gameScale,
            add: true,
        });

        this.platforms?.addMultiple([bigPlatform, smallPlatform]);
    }
}
