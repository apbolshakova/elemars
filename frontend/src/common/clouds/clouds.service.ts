import {MapAssets} from '../assets/map-assets/map-assets';
import {CommonScene} from '../common.scene';

export class CloudsService {
    private clouds?: Phaser.GameObjects.Group;
    private controlX = this.scene.gameWidth;
    private isFirstScreen = true;

    constructor(
        private scene: CommonScene,
        private depth: number,
        private cloudsPerScreen: number,
        private cloudsSpeed: number,
    ) {}

    public initClouds(): void {
        this.clouds = this.scene.add.group();

        for (let i = 0; i < this.cloudsPerScreen; i++) {
            this.createAndAddCloud();
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
                this.createAndAddCloud();
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
                this.createAndAddCloud();
            }
        });
    }

    private createAndAddCloud() {
        const point: Phaser.Geom.Point = this.scene.rightOutsideRect.getRandomPoint();
        const cloudType: number = Phaser.Math.Between(1, MapAssets.cloud().numOfTypes);

        const cloud: Phaser.GameObjects.Sprite = this.scene.make.sprite({
            x: point.x,
            y: point.y,
            key: MapAssets.cloud(cloudType).key,
            depth: this.depth,
            origin: {x: 0, y: 0.5},
            scale: this.scene.gameScale,
            add: true,
        });

        this.clouds?.add(cloud);
    }
}
