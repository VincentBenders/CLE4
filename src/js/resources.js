import {
    ImageSource,
    Sound,
    Resource,
    Loader,
    Actor,
    Vector,
    SpriteSheet,
    Animation, AnimationStrategy,
} from "excalibur";
import {Player} from "./player/player";


// TODO: Set the sheet paths to the correct sheet
const Resources = {
    Fish: new ImageSource('./images/Blub.png'),
    CoachFish: new ImageSource('./images/CoachFish.png'),
    Player: new ImageSource('./placeholders/mc-idle.png'),
    BoxingRing: new ImageSource('./images/BOX_RING_final.png'),
    Background1: new ImageSource('./images/BACKGROUND_01_final.png'),
    Square: new ImageSource('./placeholders/timeoutsquare.jpg'),
    PlayerSheet: new ImageSource("./animations/player/spritesheet.png"),
    Track1: new Sound('sound/GAME_OTHERSOUNDTRACK_1.mp3'),
    Track2: new Sound('sound/GAME_MAINSOUNDTRACK.wav'),
    Punch: new Sound('sound/GAME_HIT_SOUND.wav'),
    SilSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    SanderSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    JunoSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    ChrisSheet: new ImageSource('./images/sprite_sheet_chris.png'),
    GinusSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    VincentSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    KasperSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    MathijsSheet: new ImageSource('./images/sprite_sheet_sil.png'),
}

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export {Resources, ResourceLoader};

export class BossAnimations {
    idle;
    goingDown;
    tauntDownedPlayer;
    getUp;
    getHit;
    block;
    dodgeLeft;
    dodgeRight;

    constructor(sheet) {

        this.idle = animate(2000, sheet, [0, 1]);

        this.block = animate(200, sheet, [50, 51, 52, 53]);
        this.block.strategy = AnimationStrategy.End;

        this.getHit = animate(200, sheet, [40, 41, 42]);
        this.getHit.strategy = AnimationStrategy.Freeze;

        this.goingDown = animate(2000, sheet, [10, 11, 12, 13, 14]);
        this.goingDown.strategy = AnimationStrategy.Freeze;

        this.tauntDownedPlayer = animate(1000, sheet, [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);

        this.getUp = animate(2000, sheet, [30, 31]);
        this.getUp.strategy = AnimationStrategy.End;


    }
}

export class PlayerAnimation {
    idle;
    goingDown;
    getUp;
    block;
    dodgeLeft;
    dodgeRight;
    hitDownleft;
    hitUpLeft;
    hitDownRight;
    hitUpRight;

    constructor(sheet) {
    }

    //   const runAnim = Animation.fromSpriteSheet(
    //     this.PlayerAnimations,
    //     ex.range(1, 10),
    //     200
    //   );
    //265 by 265
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
            case "sil":
                image = Resources.Background1.toSprite();
                break;
            default:
                image = Resources.Background1.toSprite();
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
    return Animation.fromSpriteSheet(
        sheet,
        frames,
        Math.floor(duration / frames.length)
    );
}
