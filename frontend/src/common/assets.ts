export interface Asset {
    key: string;
    path: string;
    numOfVariants: number;
}

export class Assets {
    static get background(): Asset {
        return {
            key: 'background',
            path: 'src/assets/img/map/background.jpg',
            numOfVariants: 1,
        };
    }
    static cloud(i?: number): Asset {
        return {
            key: 'cloud' + i,
            path: 'src/assets/img/map/clouds/cloud' + i + '.png',
            numOfVariants: 4,
        };
    }
}
