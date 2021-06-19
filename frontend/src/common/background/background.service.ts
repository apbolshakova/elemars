import {MapAssets} from '../assets/map-assets/map-assets';
import {CommonScene} from '../common.scene';

export class BackgroundService {
    private background: Phaser.GameObjects.Image;

    constructor(private scene: CommonScene, private depth: number) {
        this.background = this.scene.add.image(0, 0, MapAssets.background.key);

        this.background.setDepth(this.depth);
        this.background.setOrigin(0, 0);
        this.background.setScale(this.scene.gameScale);
    }
}
