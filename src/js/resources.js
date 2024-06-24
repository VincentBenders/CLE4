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
import { Player } from "./player/player";


// TODO: Set the sheet paths to the correct sheet
const Resources = {
    Startscreen: new ImageSource('./images/Startscreen.png'),
    CoachFish: new ImageSource('./images/CoachFish.png'),
    Player: new ImageSource('./placeholders/mc-idle.png'),
    BoxingRing: new ImageSource('./images/BOX_RING_final.png'),
    Background1: new ImageSource('./images/BACKGROUND_01_final.png'),
    Background2: new ImageSource('./images/BACKGROUND_02_final.png'),
    Square: new ImageSource('./placeholders/timeoutsquare.jpg'),
    PlayerSheet: new ImageSource("./animations/player/spritesheet.png"),
    SilSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    SanderSheet: new ImageSource('./images/sprite_sheet_sander.png'),
    JunoSheet: new ImageSource('./images/sprite_sheet_juno.png'),
    ChrisSheet: new ImageSource('./images/sprite_sheet_chris.png'),
    GinusSheet: new ImageSource('./images/sprite_sheet_ginus.png'),
    VincentSheet: new ImageSource('./images/sprite_sheet_sil.png'),
    KasperSheet: new ImageSource('./images/sprite_sheet_kasper.png'),
    MathijsSheet: new ImageSource('./images/sprite_sheet_mathijs.png'),
    SilHeadShot: new ImageSource('./images/time-out-sil.png'),
    GinusHeadShot: new ImageSource('./images/time-out-ginus.png'),
    JunoHeadShot: new ImageSource('./images/time-out-juno.png'),
    ChrisHeadShot: new ImageSource('./images/time-out-chris.png'),
    KasperHeadShot: new ImageSource('./images/time-out-kasper.png'),
    Track1: new Sound('sound/GAME_OTHERSOUNDTRACK_1.mp3'),
    Track2: new Sound('sound/GAME_MAINSOUNDTRACK.wav'),
    Punch: new Sound('sound/GAME_HIT_SOUND.wav'),
}

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };

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

        this.goingDown = animate(2000, sheet, [10, 11, 12, 13]);
        this.goingDown.strategy = AnimationStrategy.Freeze;

        this.tauntDownedPlayer = animate(1000, sheet, [20, 21, 22, 23]);

        this.getUp = new Animation({
            frames: [
                {
                    graphic: sheet.sprites[33],
                    duration: 200
                },

                {
                    graphic: sheet.sprites[32],
                    duration: 200
                },

                {
                    graphic: sheet.sprites[31],
                    duration: 200
                },

                {
                    graphic: sheet.sprites[30],
                    duration: 200
                }

            ]
        });
        this.getUp.strategy = AnimationStrategy.Freeze;

        this.getHit = animate(200, sheet, [40, 41]);
        this.getHit.strategy = AnimationStrategy.End;

        this.block = animate(200, sheet, [50, 51]);
        this.block.strategy = AnimationStrategy.End;


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

        this.pos = new Vector(720, 540);
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
            case "vincent":
            case 'chris':
            case 'mathijs':
            case 'sander':
                image = Resources.Background2.toSprite();
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
