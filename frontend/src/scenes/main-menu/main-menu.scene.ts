import {Assets} from '../../common/assets';
import {BackgroundService} from '../../common/game-object-services/background.service';
import {CommonScene} from '../../common/common.scene';
import {CloudsService} from '../../common/game-object-services/clouds.service';
import {PlatformsService} from './platforms.service';

const CLOUDS_PER_SCREEN = 4;
const CLOUDS_SPEED = -5;

enum ObjectDepth {
    background = 1,
    clouds = 2,
    platforms = 3,
}

export default class MainMenuScene extends CommonScene {
    private backgroundService?: BackgroundService;
    private cloudsService?: CloudsService;
    private platformsService?: PlatformsService;

    constructor() {
        super({
            key: 'MainMenuScene',
        });
    }

    preload(): void {
        this.load.image(Assets.background.key, Assets.background.path);

        for (let i = 1; i <= Assets.cloud().numOfVariants; i++) {
            this.load.image(Assets.cloud(i).key, Assets.cloud(i).path);
        }

        for (let i = 1; i <= Assets.platform().numOfVariants; i++) {
            this.load.image(Assets.platform(i).key, Assets.platform(i).path);
        }
    }

    create(): void {
        this.initScene();

        this.backgroundService = new BackgroundService(this, ObjectDepth.background);
        this.cloudsService = new CloudsService(
            this,
            ObjectDepth.clouds,
            CLOUDS_PER_SCREEN,
            CLOUDS_SPEED,
        );
        this.platformsService = new PlatformsService(this, ObjectDepth.platforms);

        this.backgroundService.initBackground();
        this.cloudsService.initClouds();
        this.platformsService.initPlatforms();
    }

    update(): void {
        this.cloudsService?.updateClouds();
    }
}
