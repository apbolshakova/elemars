import {Assets} from '../assets';
import {CommonScene} from '../common.scene';

export class CloudsService {
    private clouds?: Phaser.GameObjects.Group;
    private controlX = this.scene.gameWidth;
    private isFirstScreen = true;

    constructor(
        private scene: CommonScene,
        private cloudsPerScreen: number,
        private cloudsSpeed: number,
    ) {}

    public initClouds(): void {
        this.clouds = this.scene.add.group();
        this.clouds.setOrigin(0, 0.5);
        this.clouds.scaleXY(this.scene.gameScale);

        for (let i = 0; i < this.cloudsPerScreen; i++) {
            this.createAndAddNewCloud();
        }
    }

    public updateClouds(): void {
        if (!this.clouds) {
            return;
        }

        const cloudElements = this.clouds.getChildren();

        if (this.isFirstScreen && this.controlX < 0) {
            // TODO здесь дублируется код с инициализацией - подумать, куда вынести и нужно ли
            for (let i = 0; i < this.cloudsPerScreen; i++) {
                this.createAndAddNewCloud();
            }
            this.isFirstScreen = false;
        }

        if (this.controlX < 0) {
            this.renewClouds();
            this.controlX = this.scene.gameWidth;
        }

        Phaser.Actions.IncX(cloudElements, this.cloudsSpeed);
        this.controlX += this.cloudsSpeed;
    }

    public renewClouds(): void {
        if (!this.clouds) {
            return;
        }

        this.clouds.getChildren().map((cloudElement: Phaser.GameObjects.GameObject) => {
            const cloudSprite: Phaser.GameObjects.Sprite =
                cloudElement as Phaser.GameObjects.Sprite;

            if (cloudSprite.x + cloudSprite.width < 0) {
                this.clouds?.remove(cloudSprite);
                this.createAndAddNewCloud();
            }
        });
    }

    private createAndAddNewCloud() {
        const point: Phaser.Geom.Point = this.scene.rightOutsideRect.getRandomPoint();
        const cloudType: number = Phaser.Math.Between(1, Assets.cloud().numOfVariants);

        this.clouds?.create(point.x, point.y, Assets.cloud(cloudType).key);
    }
}
