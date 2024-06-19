import {Boss} from "./boss.js";
import {Attack} from "./attack.js";
import {animate} from "../resources.js";
import {Move} from "./Move.js";
import {AnimationStrategy} from "excalibur";


export class SilBoss extends Boss {

    //Properties
    hitsBeforeBlock;

    constructor() {
        super(150, 'sil');

        //Set properties
        this.hitsBeforeBlock = 5;

        //fill the move object
        this.setMoves();

    }

    // Excalibur methods

    //Custom methods
    setMoves() {

        let leftHookAnimation = animate(1400, this.spriteSheet, [50, 51, 52, 53, 54]);
        this.moves.leftHook = new Attack(15, 'jab', 5, 1400, 400, leftHookAnimation, 4);


        let rightHookAnimation = animate(1400, this.spriteSheet, [40, 41, 42, 43]);
        this.moves.rightHook = new Attack(15, 'jab', 5, 1400, 400, rightHookAnimation, 3);


        let uppercutAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.uppercut = new Attack(30, 'uppercut', 7, 1000, 300, uppercutAnimation, 3);


        let tauntAnimation = animate(2000, this.spriteSheet, [72]);
        tauntAnimation.events.on('frame', (e) => {if (e.frameIndex === 0) {this.isVulnerable = true}})
        this.moves.taunt = new Move(tauntAnimation, 2000);

        //Make sure the animations go back to idle once they end
        for (const [key, move] of Object.entries(this.moves)) {

            move.animation.events.on('end', () => {
                this.resumeIdle();
            });

        }
    }

    setNextPattern() {
        super.setNextPattern();

        this.pattern.push(this.moves.leftHook);
        this.pattern.push(this.moves.rightHook);
        this.pattern.push(this.moves.uppercut);

    }

    postGetUp() {

        //After sil gets up, he needs to block sooner
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