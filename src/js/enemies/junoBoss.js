import {Boss} from "./boss.js";
import {animate} from "../resources.js";
import {Attack} from "./attack.js";
import {AnimationStrategy} from "excalibur";


export class JunoBoss extends Boss {

    //Properties

    constructor() {
        super(125, 'juno');

        this.nextAttackDelay = 1500;

        this.resetAttackTimers();

        this.setMoves();

    }

    //Excalibur methods

    //Custom methods

    setMoves() {

        this.animations.dodgeRight = animate(500, this.spriteSheet, [60, 61, 62, 63]);
        this.animations.dodgeLeft = animate(500, this.spriteSheet, [70, 71, 72, 73]);
        this.animations.dodgeRight.strategy = AnimationStrategy.End;
        this.animations.dodgeLeft.strategy = AnimationStrategy.End;
        this.animations.dodgeRight.events.on('end', () => {this.resumeIdle()});
        this.animations.dodgeLeft.events.on('end', () => {this.resumeIdle()});
        // this.animations.dodgeRight.strategy = AnimationStrategy.PingPong;
        // this.animations.dodgeLeft.strategy = AnimationStrategy.PingPong;
        // this.animations.dodgeRight.events.on('loop', (e) => {console.log(e.direction); if (e.direction === -1) {this.resumeIdle()}});
        // this.animations.dodgeLeft.events.on('loop', (e) => {console.log(e.direction); if (e.direction === -1) {this.resumeIdle()}});

        const leftJabAnimation = animate(1000, this.spriteSheet, [80, 81, 82, 83, 84, 85]);
        this.moves.leftJab = new Attack(15, 'jab', 10, 1000, 300, leftJabAnimation, 5);

        const rightJabAnimation = animate(1000, this.spriteSheet, [90, 91, 92, 93, 94, 95]);
        this.moves.rightJab = new Attack(15, 'jab', 10, 1000, 300, rightJabAnimation, 5);

        const mozzmaniaAnimation = animate(1000, this.spriteSheet, [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]);
        this.moves.mozzMania = new Attack(45, 'earClap', 16, 1500, 300, mozzmaniaAnimation, 8);


        //Make sure the animations go back to idle once they end
        for (const [key, move] of Object.entries(this.moves)) {

            move.animation.events.on('end', () => {
                this.setTimer(200, this.resumeIdle);
            });

        }

    }

    setNextPattern() {
        super.setNextPattern();

        switch (this.timesDowned) {
            case 0:
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.mozzMania);
                break;
            case 1:
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.mozzMania);
                break;
            case 2:
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.rightJab);
                break;
            default:
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.mozzMania);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
        }


    }

    block() {

        let animation;
        if (this.lastHitBy === 'lower left' || this.lastHitBy === 'upper left') {
            animation = this.animations.dodgeRight;
        } else {
            animation = this.animations.dodgeLeft;
        }

        animation.reset();
        this.graphics.use(animation);


        animation.events.on('end', () => {
            this.resumeIdle();
        })

    }


}