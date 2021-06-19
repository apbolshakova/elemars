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
            fontSize: 28,
            padding: {
                x: 24,
                y: 12,
            },
        };
    }

    static get MEDIUM_BUTTON() {
        return {
            fontSize: 42,
            padding: {
                x: 24,
                y: 12,
            },
        };
    }
}

export class UserInterfaceService {
    constructor(private scene: MainMenuScene, private depth: number) {
        this.initUserInterface();
    }

    private initUserInterface(): void {
        this.initGameTitle();
        this.initAuthorsButton();
        this.initNewGameButton();
        this.initGamesTable();
    }

    private initGameTitle(): void {
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

    private initAuthorsButton(): void {
        const authorsButton = this.scene.rexUI.add
            .buttons({
                x: 250 * this.scene.gameScale, // TODO вынести координаты в константы
                y: 1140 * this.scene.gameScale,
                buttons: [this.createSmallButton('Авторы')],
                origin: {x: 0, y: 0},
            })
            .layout()
            .setDepth(this.depth);

        // TODO избавиться от any
        authorsButton.on('button.over', (button: any) => {
            button.getElement('background').setFillStyle(`0x${CommonStyles.LIGHT_COLOR_HOVER}`);
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

    private initNewGameButton(): void {
        const newGameButton = this.scene.rexUI.add
            .buttons({
                x: 1500 * this.scene.gameScale, // TODO вынести координаты в константы
                y: 1050 * this.scene.gameScale,
                buttons: [this.createMediumButton('Новая игра')],
                origin: {x: 0, y: 0},
            })
            .layout()
            .setDepth(this.depth);

        // TODO избавиться от any
        newGameButton.on('button.over', (button: any) => {
            button.getElement('background').setFillStyle(`0x${CommonStyles.LIGHT_COLOR_HOVER}`);
            document.body.style.cursor = 'pointer';
        });
        newGameButton.on('button.out', (button: any) => {
            button.getElement('background').setFillStyle(`0x${CommonStyles.LIGHT_COLOR}`);
            document.body.style.cursor = 'default';
        });
        newGameButton.on('button.click', () => {
            alert('Тут будет создание новой игры'); // TODO сделать выпадашку
        });
    }

    private initGamesTable(): void {
        const CreateItems = function (count: any) {
            const data = [];
            for (let i = 0; i < count; i++) {
                data.push({
                    id: i,
                    color: Phaser.Math.Between(0, 0xffffff),
                });
            }
            return data;
        };

        // TODO реализовать норм отображение данных
        //const gamesTable =
        this.scene.rexUI.add
            .gridTable({
                x: 850 * this.scene.gameScale,
                y: 550 * this.scene.gameScale,
                width: 1600 * this.scene.gameScale,
                height: 800 * this.scene.gameScale,
                // TODO посмотреть можно ли вместо умножения на gameScale делать setScale
                background: this.scene.rexUI.add
                    .roundRectangle(
                        0,
                        0,
                        20 * this.scene.gameScale,
                        10 * this.scene.gameScale,
                        10 * this.scene.gameScale,
                        `0x${CommonStyles.LIGHT_COLOR}`,
                        0.5,
                    )
                    .setStrokeStyle(
                        CommonStyles.CONTAINERS_STROKE_WIDTH * this.scene.gameScale,
                        `0x${CommonStyles.DARK_COLOR}`,
                    ),
                table: {
                    cellHeight: 60 * this.scene.gameScale,
                    columns: 1,
                    mask: {
                        padding: 2 * this.scene.gameScale,
                    },
                    reuseCellContainer: true,
                },

                slider: {
                    track: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, `0x${CommonStyles.DARK_COLOR}`, 0),
                    thumb: this.scene.rexUI.add.roundRectangle(
                        0,
                        0,
                        5 * this.scene.gameScale,
                        100 * this.scene.gameScale,
                        6 * this.scene.gameScale,
                        `0x${CommonStyles.DARK_COLOR}`,
                    ),
                },

                space: {
                    left: 20 * this.scene.gameScale,
                    right: 20 * this.scene.gameScale,
                    top: 20 * this.scene.gameScale,
                    bottom: 20 * this.scene.gameScale,
                },

                createCellContainerCallback: this.createTableCell.bind(this),
                items: CreateItems(100),
            })
            .layout()
            .setDepth(this.depth);
    }

    // TODO вынести в common
    private createSmallButton(text: string): Phaser.GameObjects.GameObject {
        return this.scene.rexUI.add.label({
            // TODO найти способ избавиться от этих нулей-аргументов
            background: this.scene.rexUI.add
                .roundRectangle(0, 0, 0, 0, CommonStyles.BORDER_RADIUS, `0x${CommonStyles.LIGHT_COLOR}`)
                .setStrokeStyle(
                    CommonStyles.CONTAINERS_STROKE_WIDTH * this.scene.gameScale,
                    `0x${CommonStyles.DARK_COLOR}`,
                ),
            text: this.scene.add.text(0, 0, text, {
                fontFamily: CommonStyles.FONT_FAMILY,
                fontSize: `${CommonStyles.SMALL_BUTTON.fontSize * this.scene.gameScale}px`,
                color: `#${CommonStyles.DARK_COLOR}`,
                padding: CommonStyles.SMALL_BUTTON.padding, // TODO потерялось скалирование
            }),
            align: 'center',
        });
    }

    private createMediumButton(text: string): Phaser.GameObjects.GameObject {
        return this.scene.rexUI.add.label({
            // TODO найти способ избавиться от этих нулей-аргументов
            background: this.scene.rexUI.add
                .roundRectangle(0, 0, 0, 0, CommonStyles.BORDER_RADIUS, `0x${CommonStyles.LIGHT_COLOR}`)
                .setStrokeStyle(
                    CommonStyles.CONTAINERS_STROKE_WIDTH * this.scene.gameScale,
                    `0x${CommonStyles.DARK_COLOR}`,
                ),
            text: this.scene.add.text(0, 0, text, {
                fontFamily: CommonStyles.FONT_FAMILY,
                fontSize: `${CommonStyles.MEDIUM_BUTTON.fontSize * this.scene.gameScale}px`,
                color: `#${CommonStyles.DARK_COLOR}`,
                padding: CommonStyles.MEDIUM_BUTTON.padding, // TODO потерялось скалирование
            }),
            align: 'center',
        });
    }

    // TODO починить
    private createTableCell(): Phaser.GameObjects.GameObject {
        const cellContainer = this.scene.rexUI.add.label({
            width: 1500 * this.scene.gameScale,

            background: this.scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0),
            text: this.scene.add.text(0, 0, 'Игра', {
                fontFamily: CommonStyles.FONT_FAMILY,
                fontSize: `${CommonStyles.SMALL_BUTTON.fontSize * this.scene.gameScale}px`,
                color: `#${CommonStyles.DARK_COLOR}`,
                padding: CommonStyles.SMALL_BUTTON.padding,
            }),

            space: {
                icon: 10,
                left: 15,
                top: 0,
            },
        });

        // Set properties from item value
        cellContainer.getElement('background').setDepth(this.depth);
        return cellContainer;
    }
}
