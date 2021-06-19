import {CharacterAssets} from './character-assets';

export class CharactersAssets {
    static get fire(): CharacterAssets {
        return {
            frontStand: {
                key: 'fire-front-stand',
                animationKey: 'fire-front-stand-anim',
                path: 'src/assets/img/characters/fire/fire_front-stand.png',
                numOfSprites: 49,
            },
        };
    }
    static get ice(): CharacterAssets {
        return {
            frontStand: {
                key: 'ice-front-stand',
                animationKey: 'ice-front-stand-anim',
                path: 'src/assets/img/characters/ice/ice_front-stand.png',
                numOfSprites: 49,
            },
        };
    }
}
