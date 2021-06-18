import {Assets} from '../assets';
import {CommonScene} from '../common.scene';

export class BackgroundService {
    private background?: Phaser.GameObjects.Image;

    constructor(private scene: CommonScene) {}

    public initBackground(): void {
        this.background = this.scene.add.image(0, 0, Assets.background.key);

        this.background.setOrigin(0, 0);
        this.background.setScale(this.scene.gameScale);
    }
}
