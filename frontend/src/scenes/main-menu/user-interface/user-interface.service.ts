import MainMenuScene from '../main-menu.scene';

export class CommonStyles {
    // TODO вынести в common
    static readonly FONT_FAMILY = '"Inter", sans-serif';
    static readonly LIGHT_COLOR = 'FFFFFF';
    static readonly LIGHT_COLOR_HOVER = 'FDE3DB';
    static readonly DARK_COLOR = 'AB47BC';
    static readonly BORDER_RADIUS = 8;
    static readonly CONTAINERS_STROKE_WIDTH = 3;
    static readonly TEXT_STROKE_WIDTH = 5;
    static get SMALL_BUTTON() {
        return {
            minWidth: 150,
            fontSize: 36,
            padding: 12,
        };
    }
}

export class UserInterfaceService {
    private userInterface: Phaser.GameObjects.Group;

    constructor(private scene: MainMenuScene, private depth: number) {
        this.userInterface = this.scene.add.group();
        this.createAndAddUserInterface();
    }

    private createAndAddUserInterface(): void {
        this.createAndAddGameTitle();
        this.createAndAddAuthorsButton();
    }

    private createAndAddGameTitle(): void {
        this.scene.add
            .text(this.scene.gameWidth / 2, 10 * this.scene.gameScale, 'Элемары', {
                fontFamily: CommonStyles.FONT_FAMILY,
                fontSize: `${96 * this.scene.gameScale}px`,
                fontStyle: 'bold',
                color: `#${CommonStyles.LIGHT_COLOR}`,
                stroke: `#${CommonStyles.DARK_COLOR}`,
                strokeThickness: CommonStyles.TEXT_STROKE_WIDTH * this.scene.gameScale,
            })
            .setOrigin(0.5, 0)
            .setDepth(this.depth);
    }

    private createAndAddAuthorsButton(): void {
        const authorsButton = this.scene.rexUI.add
            .buttons({
                x: 270 * this.scene.gameScale, // TODO вынести координаты в константы
                y: 1130 * this.scene.gameScale,
                buttons: [this.createSmallButton('Авторы')],
                origin: {x: 0, y: 0},
            })
            .layout()
            .setDepth(this.depth);

        // TODO избавиться от any
        authorsButton.on('button.over', (button: any) => {
            button
                .getElement('background')
                .setFillStyle(`0x${CommonStyles.LIGHT_COLOR_HOVER}`);
            document.body.style.cursor = 'pointer';
        });
        authorsButton.on('button.out', (button: any) => {
            button.getElement('background').setFillStyle(`0x${CommonStyles.LIGHT_COLOR}`);
            document.body.style.cursor = 'default';
        });
        authorsButton.on('button.click', () => {
            alert('Тут будет выпадашка'); // TODO сделать выпадашку
        });
    }

    // TODO вынести в common
    private createSmallButton(text: string): Phaser.GameObjects.GameObject {
        return this.scene.rexUI.add.label({
            width: CommonStyles.SMALL_BUTTON.minWidth,
            background: this.scene.rexUI.add
                .roundRectangle(
                    // TODO найти способ избавиться от этих нулей-аргументов
                    0,
                    0,
                    0,
                    0,
                    CommonStyles.BORDER_RADIUS,
                    Number(`0x${CommonStyles.LIGHT_COLOR}`),
                )
                .setStrokeStyle(
                    CommonStyles.CONTAINERS_STROKE_WIDTH * this.scene.gameScale,
                    Number(`0x${CommonStyles.DARK_COLOR}`),
                ),
            text: this.scene.add.text(0, 0, text, {
                fontFamily: CommonStyles.FONT_FAMILY,
                fontSize: `${
                    CommonStyles.SMALL_BUTTON.fontSize * this.scene.gameScale
                }px`,
                color: `#${CommonStyles.DARK_COLOR}`,
                padding: {
                    x: CommonStyles.SMALL_BUTTON.padding,
                    y: CommonStyles.SMALL_BUTTON.padding,
                },
            }),
            align: 'center',
        });
    }
}
