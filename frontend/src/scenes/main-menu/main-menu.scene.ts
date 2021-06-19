import {MapAssets} from '../../common/assets/map-assets/map-assets';
import {BackgroundService} from '../../common/background/background.service';
import {CommonScene} from '../../common/common.scene';
import {CloudsService} from '../../common/clouds/clouds.service';
import {PlatformsService} from './platforms/platforms.service';
import {ElemarsService} from './elemars/elemars.service';
import {CharactersAssets} from '../../common/assets/characters-assets/characters-assets';
import {UserInterfaceService} from './user-interface/user-interface.service';
import WebFontFile from '../../common/web-font-file';

const CLOUDS_PER_SCREEN = 4;
const CLOUDS_SPEED = -5;

const CHARACTER_SPRITE_SIZE = 500;

enum ObjectDepth {
    BACKGROUND = 1,
    CLOUDS = 2,
    PLATFORMS = 3,
    ELEMARS = 4,
    USER_INTERFACE = 5,
}

export default class MainMenuScene extends CommonScene {
    private backgroundService?: BackgroundService;
    private cloudsService?: CloudsService;
    private platformsService?: PlatformsService;
    private elemarsService?: ElemarsService;
    private userInterfaceService?: UserInterfaceService;

    public rexUI: any;

    constructor() {
        super({
            key: 'MainMenuScene',
        });
    }

    preload(): void {
        this.load.scenePlugin(
            // TODO отвязаться от подкачки со стороны
            'rexuiplugin',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            'rexUI',
            'rexUI',
        );

        this.load.addFile(new WebFontFile(this.load, 'Inter'));

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
        this.userInterfaceService = new UserInterfaceService(
            this,
            ObjectDepth.USER_INTERFACE,
        );
    }

    update(): void {
        this.cloudsService?.updateClouds();
    }
}
