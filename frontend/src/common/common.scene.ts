export class CommonScene extends Phaser.Scene {
    public gameWidth = 0;
    public gameHeight = 0;
    public gameScale = 0;
    public globalX = 0;
    public rightOutsideRect = new Phaser.Geom.Rectangle(0, 0, 0, 0);

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }

    public initScene(): void {
        this.gameWidth = this.sys.game.scale.gameSize.width;
        this.gameHeight = this.sys.game.scale.gameSize.height;
        this.gameScale = this.gameWidth / 2400;
        this.globalX = this.gameWidth;
        this.rightOutsideRect = new Phaser.Geom.Rectangle(
            this.gameWidth, // TODO решить проблему "внезапно рендерищихся" облаков
            0,
            this.gameWidth,
            this.gameHeight,
        );
    }
}
