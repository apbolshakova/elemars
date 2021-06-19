import {MapAssets} from '../../common/assets/map-assets/map-assets';
import {BackgroundService} from '../../common/background/background.service';
import {CommonScene} from '../../common/common.scene';
import {CloudsService} from '../../common/clouds/clouds.service';
import {PlatformsService} from './platforms/platforms.service';
import {ElemarsService} from './elemars/elemars.service';
import {CharactersAssets} from '../../common/assets/characters-assets/characters-assets';

const CLOUDS_PER_SCREEN = 4;
const CLOUDS_SPEED = -1;

const CHARACTER_SPRITE_SIZE = 500;

enum ObjectDepth {
    BACKGROUND = 1,
    CLOUDS = 2,
    PLATFORMS = 3,
    ELEMARS,
    // USER_INTERFACE,
}

export default class MainMenuScene extends CommonScene {
    private backgroundService?: BackgroundService;
    private cloudsService?: CloudsService;
    private platformsService?: PlatformsService;
    private elemarsService?: ElemarsService;

    constructor() {
        super({
            key: 'MainMenuScene',
        });
    }

    preload(): void {
        this.load.image(MapAssets.background.key, MapAssets.background.path);

        for (let i = 1; i <= MapAssets.cloud().numOfTypes; i++) {
            this.load.image(MapAssets.cloud(i).key, MapAssets.cloud(i).path);
        }

        for (let i = 1; i <= MapAssets.platform().numOfTypes; i++) {
            this.load.image(MapAssets.platform(i).key, MapAssets.platform(i).path);
        }

        this.load.spritesheet(
            CharactersAssets.fire.frontStand.key,
            CharactersAssets.fire.frontStand.path,
            {
                frameWidth: CHARACTER_SPRITE_SIZE,
                frameHeight: CHARACTER_SPRITE_SIZE,
            },
        );

        this.load.spritesheet(
            CharactersAssets.ice.frontStand.key,
            CharactersAssets.ice.frontStand.path,
            {
                frameWidth: CHARACTER_SPRITE_SIZE,
                frameHeight: CHARACTER_SPRITE_SIZE,
            },
        );
    }

    create(): void {
        this.initScene();

        this.backgroundService = new BackgroundService(this, ObjectDepth.BACKGROUND);
        this.cloudsService = new CloudsService(
            this,
            ObjectDepth.CLOUDS,
            CLOUDS_PER_SCREEN,
            CLOUDS_SPEED,
        );
        this.platformsService = new PlatformsService(this, ObjectDepth.PLATFORMS);
        this.elemarsService = new ElemarsService(this, ObjectDepth.ELEMARS);
        // this.userInterfaceService = new UserInterfaceService(
        //     this,
        //     ObjectDepth.USER_INTERFACE,
        // );

        this.backgroundService.initBackground();
        this.cloudsService.initClouds();
        this.platformsService.initPlatforms();
        this.elemarsService.initElemars();
        // this.userInterfaceService.initUserInterface();
        this.add
            .text(200, 24, '<- walk', {color: '#00ff00'})
            .setOrigin(0, 0.5)
            .setDepth(5);
    }

    update(): void {
        this.cloudsService?.updateClouds();
    }
}
