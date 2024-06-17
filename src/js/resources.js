import {ImageSource, Sound, Resource, Loader, Actor, Vector, SpriteSheet, Animation} from 'excalibur'

const Resources = {
    Fish: new ImageSource('./images/Blub.png'),
    Player: new ImageSource('./placeholders/mc-idle.png'),
    BoxingRing: new ImageSource('./images/BOX_RING_final.png'),
    Background1: new ImageSource('./images/BACKGROUND_01_final.png'),
    SilSheet: new ImageSource('./placeholders/sil-special-attack-spritesheet.png'),
    Square: new ImageSource('./public/placeholders/timeoutsquare.jpg')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }

export class BossAnimations {

    idle;
    // goingDownUpLeft;
    // goingDownUpRight;
    // goingDownDownLeft;
    // goingDownDownRight;
    goingDown;
    tauntDownedPlayer;
    getUp;
    // getHitUpLeft;
    // getHitUpRight;
    // getHitDownLeft;
    // getHitDownRight;
    getHit;
    block;
    dodgeLeft;
    dodgeRight;

    constructor(sheet) {



    }


}

export class BoxingRing extends Actor {

    constructor() {
        super();

        this.graphics.use(Resources.BoxingRing.toSprite());

        this.pos = new Vector(720, 450);

    }

}

export class Background extends Actor {


    constructor() {
        super();

        this.graphics.use(Resources.Background1.toSprite());

        this.pos = new Vector(720, 450);

    }

    setBackgroundImageFor(bossName) {

        let image;

        switch (bossName) {
            case 'sil': image = Resources.Background1.toSprite(); break;
            default: image = Resources.Background1.toSprite();
        }

        this.graphics.use(image);

    }


}

/**
 * A quick way to create an animation from a sprite sheet
 * @param duration {Number} - How long the animation should take in total in milliseconds
 * @param sheet {SpriteSheet} - The sheet of sprites
 * @param frames {Array} - An array containing the indexes of the frames you want to animate
 * @returns {Animation}
 */
export function animate(duration, sheet, frames) {

    return Animation.fromSpriteSheet(sheet, frames, (Math.floor(duration / frames.length)));

}