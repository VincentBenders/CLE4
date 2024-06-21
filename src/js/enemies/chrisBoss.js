import {Boss} from "./boss.js";
import {Random} from "excalibur";
import {animate} from "../resources.js";


export class ChrisBoss extends Boss {

    //Properties
    random;
    blockChance;

    constructor() {
        super(125, 'chris');
        this.random = new Random();

        this.nextAttackDelay = 750;

        this.blockChance = 0.8;

        this.nextPatternDelay = this.random.integer(750, 2250) ;


        this.setMoves();


    }

    //Excalibur methods

    //Custom methods

    setMoves() {


        const leftJabAnimation = animate(600, this.spriteSheet, )




        //Make sure the animations go back to idle once they end
        for (const [key, move] of Object.entries(this.moves)) {

            move.animation.events.on('end', () => {
                this.setTimer(this.random.integer(100, 300), this.resumeIdle);
            });

        }

    }

    setNextPattern() {
        super.setNextPattern();



        this.nextPatternDelay = this.random.integer(750, 2250) ;

    }

    postOnHit() {

        if (this.counterHits > 0) {
            return;
        }

        if (this.random.bool(this.blockChance)) {
            this.isHittableBody = false;
            this.isHittableHead = false;
        } else {
            this.isHittableBody = true;
            this.isHittableHead = true;
        }

    }

    postGetUp() {
        super.postGetUp();

        this.blockChance -= 0.15;


    }


}