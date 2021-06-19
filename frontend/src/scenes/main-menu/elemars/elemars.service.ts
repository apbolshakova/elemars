import MainMenuScene from '../main-menu.scene';
import {CharactersAssets} from '../../../common/assets/characters-assets/characters-assets';

const FORCED_SCALE = 1.25;
const FRAME_RATE = 30;
const FIRE_COORDINATES = {
    x: 1930,
    y: 120,
};
const ICE_COORDINATES = {
    x: 1620,
    y: 110,
};
const ICE_ANIMATION_DELAY = 1000;

export class ElemarsService {
    private elemars?: Phaser.GameObjects.Group;

    constructor(private scene: MainMenuScene, private depth: number) {}

    public initElemars(): void {
        this.initElemarsAnimations();
        this.elemars = this.scene.add.group();
        this.createAndAddElemars();
    }

    private createAndAddElemars() {
        const fire: Phaser.GameObjects.Sprite = this.scene.make
            .sprite({
                x: FIRE_COORDINATES.x * this.scene.gameScale,
                y: FIRE_COORDINATES.y * this.scene.gameScale,
                depth: this.depth,
                origin: {x: 0, y: 0},
                scale: this.scene.gameScale * FORCED_SCALE,
                add: true,
            })
            .play(CharactersAssets.fire.frontStand.animationKey);

        const ice: Phaser.GameObjects.Sprite = this.scene.make
            .sprite({
                x: ICE_COORDINATES.x * this.scene.gameScale,
                y: ICE_COORDINATES.y * this.scene.gameScale,
                key: CharactersAssets.ice.frontStand.key,
                depth: this.depth,
                origin: {x: 0, y: 0},
                scale: this.scene.gameScale * FORCED_SCALE,
                add: true,
            })
            .play(CharactersAssets.ice.frontStand.animationKey);

        this.elemars?.addMultiple([fire, ice]);
    }

    private initElemarsAnimations() {
        this.scene.anims.create({
            key: CharactersAssets.fire.frontStand.animationKey,
            frames: CharactersAssets.fire.frontStand.key,
            frameRate: FRAME_RATE,
            repeat: -1,
        });

        this.scene.anims.create({
            key: CharactersAssets.ice.frontStand.animationKey,
            frames: CharactersAssets.ice.frontStand.key,
            frameRate: FRAME_RATE,
            repeat: -1,
            repeatDelay: ICE_ANIMATION_DELAY,
        });
    }
}
