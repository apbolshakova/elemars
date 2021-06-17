import {Assets} from '../common/assets';

const CLOUDS_PER_SCREEN = 4;

export default class MainMenuScene extends Phaser.Scene {
    // TODO вынести в более общее место (мб в интерфейс)
    private gameWidth = 0;
    private gameHeight = 0;
    private gameScale = 0;
    private globalX = 0;
    private rightOutsideRect = new Phaser.Geom.Rectangle(0, 0, 0, 0);

    private clouds: Phaser.GameObjects.Group | undefined;

    constructor() {
        super({
            key: 'MainMenuScene',
        });
    }

    preload(): void {
        // TODO переписать функцией, автоматически проходящей по Assets
        this.load.image(Assets.background.key, Assets.background.path);
        this.load.image(Assets.cloud(1).key, Assets.cloud(1).path);
        this.load.image(Assets.cloud(2).key, Assets.cloud(2).path);
        this.load.image(Assets.cloud(3).key, Assets.cloud(3).path);
        this.load.image(Assets.cloud(4).key, Assets.cloud(4).path);
    }

    create(): void {
        // TODO вынести в отдельный метод
        this.gameWidth = this.sys.game.scale.gameSize.width;
        this.gameHeight = this.sys.game.scale.gameSize.height;
        this.gameScale = this.gameWidth / 2400;
        this.globalX = this.gameWidth;
        this.rightOutsideRect = new Phaser.Geom.Rectangle(
            this.gameWidth,
            0,
            this.gameWidth,
            this.gameHeight,
        );

        this.initBackground();
        this.initClouds();
    }

    update(): void {
        if (this.clouds) {
            if (this.globalX < 0) {
                this.renewCloudElements();
                this.globalX = this.gameWidth;
            }

            const cloudElements = this.clouds.getChildren();

            Phaser.Actions.IncX(cloudElements, -5);
            this.globalX -= 5;
        }
    }

    private initBackground(): Phaser.GameObjects.Image {
        const background = this.add.image(0, 0, Assets.background.key);

        background.setOrigin(0, 0);
        background.setScale(this.gameScale);

        return background;
    }

    // TODO при реализации логики игры попытаться вынести общую логику трёх методов ниже
    private initClouds(): void {
        this.clouds = this.add.group();
        this.clouds.setOrigin(0, 0.5);

        for (let i = 0; i <= CLOUDS_PER_SCREEN; i++) {
            this.createAndAddNewCloud();
        }
    }

    private createAndAddNewCloud() {
        const point: Phaser.Geom.Point = this.rightOutsideRect.getRandomPoint();
        const cloudType: number = Phaser.Math.Between(1, Assets.cloud().numOfVariants);

        this.clouds?.create(point.x, point.y, Assets.cloud(cloudType).key);
    }

    private renewCloudElements(): void {
        if (this.clouds) {
            this.clouds
                .getChildren()
                .map((cloudElement: Phaser.GameObjects.GameObject) => {
                    const cloudSprite: Phaser.GameObjects.Sprite =
                        cloudElement as Phaser.GameObjects.Sprite;
                    if (cloudSprite.x + cloudSprite.width < 0) {
                        this.clouds?.remove(cloudSprite);
                        this.createAndAddNewCloud();
                    }
                });
        }
    }
}
