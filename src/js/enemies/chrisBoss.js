import {Boss} from "./boss.js";
import {Random} from "excalibur";
import {animate} from "../resources.js";
import {Attack} from "./attack.js";


export class ChrisBoss extends Boss {

    //Properties
    random;
    blockChance;
    patternLengthMax;


    constructor() {
        super(125, 'chris');
        this.random = new Random();

        this.nextAttackDelay = 350;

        this.blockChance = 0.8;

        this.nextPatternDelay = this.random.integer(250, 550);

        this.patternLengthMax = 4;

        this.stunnedDuration = 1000;


        this.setMoves();


    }

    //Excalibur methods

    //Custom methods

    setMoves() {


        const leftJabAnimation = animate(800, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.leftJab = new Attack(20, 'jab', 8, 600, 300, leftJabAnimation, 3);

        const rightJabAnimation = animate(800, this.spriteSheet, [60, 61, 62, 63, 64]);
        this.moves.rightJab = new Attack(20, 'jab', 8, 700, 300, rightJabAnimation, 4);

        const leftHookAnimation = animate(1200, this.spriteSheet, [84, 85, 86, 87, 88]);
        this.moves.leftHook = new Attack(35, 'leftHook', 12, 400, 200, leftHookAnimation, 4);



        //Make sure the animations go back to idle once they end
        for (const [key, move] of Object.entries(this.moves)) {

            move.animation.events.on('end', () => {
                this.setTimer(this.random.integer(100, 300), this.resumeIdle);
            });

        }

    }

    setNextPattern() {
        super.setNextPattern();


        const patternLength = this.random.integer(1, this.patternLengthMax);

        const attackList = Object.entries(this.moves);

        let nextAttacks = this.random.pickSet(attackList, patternLength, true)

        for (const nextAttack of nextAttacks) {

            this.pattern.unshift(nextAttack[1]);

        }

        this.nextPatternDelay = this.random.integer(450, 8250);

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
        this.patternLengthMax++;

        this.nextAttackDelay -= 100;

        if (this.nextAttackDelay < 50) {
            this.nextAttackDelay = 50;
        }


    }


}