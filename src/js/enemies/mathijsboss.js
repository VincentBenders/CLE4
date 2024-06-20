import {Boss} from "./boss.js";
import {Attack} from "./attack.js";
import {animate} from "../resources.js";
import {Move} from "./Move.js";
import {AnimationStrategy} from "excalibur";

export class MathijsBoss extends Boss {

    //Properties

    constructor() {
        super(150, 'mathijs');

        //fill the move object
        this.setMoves();
    }

    setMoves() {
        //leftpunch
        let leftPunchAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.uppercut = new Attack(30, 'uppercut', 7, 1000, 300, leftPunchAnimation, 3);

        //rightpunch
        let rightPunchAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.uppercut = new Attack(30, 'uppercut', 7, 1000, 300, rightPunchAnimation, 3);

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

        this.pattern.push(this.moves.leftHook);
        this.pattern.push(this.moves.rightHook);
        this.pattern.push(this.moves.uppercut);

    }

    postGetUp() {

       
    }

    postOnPostUpdate() {
        const time = this.scene.ui.clock.innerText;

        if (time === '2:30' || time === '1:30' || time === '0:30') {

            //Uses unshift to make sure the taunt is the next move in the pattern
            this.pattern.unshift(this.moves.taunt);

        }
    }
}
