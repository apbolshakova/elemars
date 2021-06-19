import {Asset} from '../asset';

export interface CharacterAsset extends Asset {
    numOfSprites: number;
    animationKey: string;
}
