import {ImageSource, Sound, Resource, Loader, Actor, Vector} from 'excalibur'

const Resources = {
    // Fish: new ImageSource('./images/fish.png'),
    Player: new ImageSource('./placeholders/mc-idle.png'),
    BoxingRing: new ImageSource('./images/BOX_RING_final.png'),
    Background1: new ImageSource('./images/BACKGROUND_01_final.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }

export class BossAnimations {

    bossName;
    idle;
    goingDownUpLeft;
    goingDownUpRight;
    goingDownDownLeft;
    goingDownDownRight;
    tauntDownedPlayer;
    getUp;

    constructor(bossName) {

        this.bossName = bossName;

        switch (bossName) {
            case 'sil': break;
        }


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