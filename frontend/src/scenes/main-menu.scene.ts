import {Assets} from '../common/assets';
import {BackgroundService} from '../common/game-object-services/background.service';
import {CommonScene} from '../common/common.scene';
import {CloudsService} from '../common/game-object-services/clouds.service';

const CLOUDS_PER_SCREEN = 4;
const CLOUDS_SPEED = -5;

export default class MainMenuScene extends CommonScene {
    private backgroundService: BackgroundService;
    private cloudsService: CloudsService;

    constructor() {
        super({
            key: 'MainMenuScene',
        });

        this.backgroundService = new BackgroundService(this);
        this.cloudsService = new CloudsService(this, CLOUDS_PER_SCREEN, CLOUDS_SPEED);
    }

    preload(): void {
        this.load.image(Assets.background.key, Assets.background.path);

        for (let i = 1; i <= Assets.cloud().numOfVariants; i++) {
            this.load.image(Assets.cloud(i).key, Assets.cloud(i).path);
        }
    }

    create(): void {
        this.initScene();

        this.backgroundService.initBackground();
        this.cloudsService.initClouds();
    }

    update(): void {
        this.cloudsService.updateClouds();
    }
}
