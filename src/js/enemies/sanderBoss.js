import {Boss} from "./boss.js";
import {animate} from "../resources.js";
import {Attack} from "./attack.js";
import {Timer} from "excalibur";


export class SanderBoss extends Boss {

    //Properties

    constructor() {
        super(150, 'sander');

        this.nextAttackDelay = 400;

        this.nextPatternDelay = 3000;

        this.resetAttackTimers();

        this.resetStunTimers();

        this.setMoves();

    }

    //Excalibur methods

    //Custom methods

    setMoves() {


        const rightJab = animate(600, this.spriteSheet, [60, 61, 62, 63, 64]);
        this.moves.rightJab = new Attack(30, 'jab', 6, 400, 300, rightJab, 4);

        const leftJab = animate(600, this.spriteSheet, [70, 71, 72, 73, 74]);
        this.moves.rightJab = new Attack(30, 'jab', 6, 400, 300, leftJab, 4);

        


        //Make sure the animations go back to idle once they end
        for (const [key, move] of Object.entries(this.moves)) {

            move.animation.events.on('end', () => {
                this.setTimer(200, this.resumeIdle);
            });

        }

    }

    setNextPattern() {
        super.setNextPattern();

        this.pattern.push(this.moves.leftJab);
        this.pattern.push(this.moves.rightJab);
        this.pattern.push(this.moves.leftJab);
        this.pattern.push(this.moves.leftJab);
        this.pattern.push(this.moves.rightJab);
        this.pattern.push(this.moves.rightJab);
        this.pattern.push(this.moves.rightJab);
        this.pattern.push(this.moves.leftJab);
        this.pattern.push(this.moves.leftJab);
        this.pattern.push(this.moves.leftJab);



    }


}