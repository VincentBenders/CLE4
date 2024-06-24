import {Boss} from "./boss.js";
import {Attack} from "./attack.js";
import {animate} from "../resources.js";
import {Move} from "./Move.js";
import {AnimationStrategy} from "excalibur";

export class VincentBoss extends Boss {

    //Properties
    hitsBeforeBlock;

    constructor() {
        super(150, 'vincent');

        //Set properties
        this.hitsBeforeBlock = 8;

        //fill the move object
        this.setMoves();
    }

    setMoves() {
        //idle
        let idleAnimation = animate(1000, this.spriteSheet, [0, 1, 2, 3]);
        this.moves.idle = new Attack(30, 'idle', 7, 1000, 300, idleAnimation, 3);
        //goingdown
        let goingDownAnimation = animate(1000, this.spriteSheet, [5, 6, 7, 8]);
        this.moves.goingdown = new Attack(30, 'goingdown', 7, 1000, 300, goingDownAnimation, 3);
        //getup
        let getUpAnimation = animate(1000, this.spriteSheet, [15, 16, 17, 18]);
        this.moves.getup = new Attack(30, 'getup', 7, 1000, 300, getUpAnimation, 3);
        //gethit
        let getHitAnimation = animate(1000, this.spriteSheet, [20, 21]);
        this.moves.gethit = new Attack(30, 'gethit', 7, 1000, 300, getHitAnimation, 3);
        //block
        let blockAnimation = animate(1000, this.spriteSheet, [25, 26]);
        this.moves.block = new Attack(30, 'block', 7, 1000, 300, blockAnimation, 3);

        //left punch
        let leftPunchAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.leftpunch = new Attack(30, 'leftpunch', 7, 1000, 300, leftPunchAnimation, 3);
        //right punch
        let rightPunchAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.rightpunch = new Attack(30, 'rightpunch', 7, 1000, 300, rightPunchAnimation, 3);

        let tauntAnimation = animate(2000, this.spriteSheet, [72]);
        tauntAnimation.events.on('frame', (e) => {if (e.frameIndex === 0) {this.isVulnerable = true}})
        this.moves.taunt = new Move(tauntAnimation, 2000);

        for (const [key, move] of Object.entries(this.moves)) {
            move.animation.events.on('end', () => {
                this.resumeIdle();
            });
        }
    }

    setNextPattern() {
        super.setNextPattern();

        this.pattern.push(this.moves.leftpunch);
        this.pattern.push(this.moves.rightpunch);
        this.pattern.push(this.moves.leftpunch);
        this.pattern.push(this.moves.rightpunch);
        this.pattern.push(this.moves.rightpunch);

    }

     // getRandomInt(max) {
        // return Math.floor(Math.random() * max);
    //   }
    // setNextPattern() {
        // super.setNextPattern();
        // for (let i = 0; i < 3; i++) {
            // if (this.getRandomInt(2) === 0){
                // this.pattern.push(this.moves.leftpunch);
            // } else {
                // this.pattern.push(this.moves.rightpunch);
            // }
        // } 
        // this.pattern.push(this.moves.rightpunch);
    // }

    postGetUp() {

        //After vincent gets up, he needs to block sooner
        this.hitsBeforeBlock--;

        //Make sure this number can't go below 0
        if (this.hitsBeforeBlock < 0) {
            this.hitsBeforeBlock = 0;
        }

    }

    postOnPostUpdate() {
        const time = this.scene.ui.clock.innerText;

        if (time === '2:30' || time === '1:30' || time === '0:30') {

            //Uses unshift to make sure the taunt is the next move in the pattern
            this.pattern.unshift(this.moves.taunt);

        }
    }
}