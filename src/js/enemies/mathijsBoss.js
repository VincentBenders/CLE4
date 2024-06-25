import {Boss} from "./boss.js";
import {Attack} from "./attack.js";
import {animate} from "../resources.js";
import {Move} from "./Move.js";
import {AnimationStrategy} from "excalibur";

export class MathijsBoss extends Boss {

    //Properties

    constructor() {
        super(400, 'mathijs');

        //fill the move object
        this.setMoves();
    }

    setMoves() {

        //leftpunch
        let leftPunchAnimation = animate(1000, this.spriteSheet, [60, 61, 62, 63]);
        this.moves.leftpunch = new Attack(30, 'rightHook', 7, 1000, 300, leftPunchAnimation, 3);

        //rightpunch
        let rightPunchAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.rightpunch = new Attack(30, 'leftHook', 7, 1000, 300, rightPunchAnimation, 3);

        //special
        let specialMoveAnimation = animate(1000, this.spriteSheet, [80, 81, 82, 83, 84, 85, 87]);
        this.moves.specialMove = new Attack(40, 'clothesline', 7, 1000, 300, specialMoveAnimation, 3);

        let tauntAnimation = animate(2000, this.spriteSheet, [50, 51]);
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

        this.pattern.push(this.moves.specialMove);
        this.pattern.push(this.moves.leftpunch);
        this.pattern.push(this.moves.taunt);
        this.pattern.push(this.moves.rightpunch);
        this.pattern.push(this.moves.leftpunch);
        this.pattern.push(this.moves.rightpunch);
        this.pattern.push(this.moves.taunt);
        
        

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
