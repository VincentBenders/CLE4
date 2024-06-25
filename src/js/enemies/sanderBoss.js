import {Boss} from "./boss.js";
import {animate} from "../resources.js";
import {Attack} from "./attack.js";
import {Timer} from "excalibur";


export class SanderBoss extends Boss {

    //Properties

    constructor() {
        super(150, 'sander');

        this.nextAttackDelay = 600;

        this.timesDownedMax = 5;

        this.nextPatternDelay = 3000;

        this.resetAttackTimers();

        this.resetStunTimers();

        this.setMoves();

    }

    //Excalibur methods

    //Custom methods

    setMoves() {


        const rightJab = animate(1100, this.spriteSheet, [90, 91, 92, 93, 94]);
        this.moves.rightJab = new Attack(25, 'jab', 5, 400, 300, rightJab, 4);

        const leftJab = animate(600, this.spriteSheet, [100, 101, 102, 103, 104]);
        this.moves.leftJab = new Attack(25, 'jab', 5, 400, 300, leftJab, 4);

        const rightOverhead = animate(800, this.spriteSheet, [60, 61, 62]);
        this.moves.rightOverhead = new Attack(40, 'overhead', 8, 400, 300, rightOverhead, 2);

        const leftOverhead = animate(1300, this.spriteSheet, [70, 71, 73]);
        this.moves.leftOverhead = new Attack(40, 'overhead', 8, 400, 300, leftOverhead, 2);

        const clotheslineAnimation = animate(1000, this.spriteSheet, [80, 81, 82, 83, 84]);
        this.moves.clothesline = new Attack(65, 'clothesline', 16, 400, 300, clotheslineAnimation, 4);


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
                this.pattern.push(this.moves.leftOverhead);
                this.pattern.push(this.moves.rightOverhead);
                this.pattern.push(this.moves.clothesline);

                break;

            case 1:
                this.pattern.push(this.moves.rightOverhead);
                this.pattern.push(this.moves.rightOverhead);
                this.pattern.push(this.moves.leftOverhead);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.clothesline);
                break;

            case 2:
                this.pattern.push(this.moves.rightOverhead);
                this.pattern.push(this.moves.leftOverhead);
                this.pattern.push(this.moves.clothesline);
                this.pattern.push(this.moves.rightOverhead);
                this.pattern.push(this.moves.leftOverhead);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.clothesline);
                break;

            default:
                this.pattern.push(this.moves.rightOverhead);
                this.pattern.push(this.moves.rightOverhead);
                this.pattern.push(this.moves.leftOverhead);
                this.pattern.push(this.moves.clothesline);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.clothesline);
        }


    }


}