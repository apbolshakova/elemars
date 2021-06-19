import 'phaser';
import MainMenuScene from './scenes/main-menu/main-menu.scene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: window.innerWidth * window.devicePixelRatio,
    height: (window.innerWidth / 2) * window.devicePixelRatio,
    scene: [MainMenuScene],
    backgroundColor: '#B8C5EF',
};

export default new Phaser.Game(config);
