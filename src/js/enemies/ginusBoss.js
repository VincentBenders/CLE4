import { Boss } from "./boss.js";
import { Attack } from "./attack.js";
import { animate } from "../resources.js";
import { Move } from "./Move.js";

export class GinusBoss extends Boss {

    //Properties
    isHittableBody;
    isHittableHead;
    constructor() {
        super(75, 'ginus');

        this.nextAttackDelay = 1000;

        this.hitsBeforeBlock = 2;

        this.setMoves();

        // this.isHittableHead = false;
        // this.isHittableBody = false;

    }

    //Excalibur methods

    //Custom methods

    setMoves() {

        //Set properties

        let rightJabAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.rightJab = new Attack(15, 'jab', 4, 1000, 200, rightJabAnimation, 4);

        let leftJabAnimation = animate(1000, this.spriteSheet, [60, 61, 62, 63]);
        this.moves.leftJab = new Attack(15, 'jab', 4, 1000, 200, leftJabAnimation, 4);

        let leftHookAnimation = animate(1400, this.spriteSheet, [90, 91, 92, 93, 94]);
        this.moves.leftHook = new Attack(25, 'hook', 6, 1400, 350, leftHookAnimation, 5);

        let rightHookAnimation = animate(1400, this.spriteSheet, [80, 81, 82, 83, 84]);
        this.moves.rightHook = new Attack(25, 'hook', 6, 1400, 350, rightHookAnimation, 5);

        let angryRabAnimation = animate(750, this.spriteSheet, [70, 71, 72, 73]);
        this.moves.angryRab = new Attack(15, 'jab', 4, 750, 200, angryRabAnimation, 4);

        let angryLabAnimation = animate(750, this.spriteSheet, [60, 61, 62, 63]);
        this.moves.angryLab = new Attack(15, 'jab', 4, 750, 200, angryLabAnimation, 4);

        let angryLookAnimation = animate(900, this.spriteSheet, [90, 91, 92, 93, 94]);
        this.moves.angryLook = new Attack(25, 'hook', 6, 900, 350, angryLookAnimation, 5);

        let angryRookAnimation = animate(900, this.spriteSheet, [80, 81, 82, 83, 84]);
        this.moves.angryRook = new Attack(25, 'hook', 6, 900, 350, angryRookAnimation, 5);

        let tauntAnimation = animate(2000, this.spriteSheet, [20, 21, 22, 23]);
        tauntAnimation.events.on('start', () => { this.isHittableBody = true; this.isHittableHead = true; this.setTimer(1000, () => { this.isHittableBody = false; this.isHittableHead = false }) })
        this.moves.taunt = new Move(tauntAnimation, 2000);



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
                this.pattern.push(this.moves.rightJab);
                this.pattern.push(this.moves.leftHook);
                this.pattern.push(this.moves.leftJab);
                this.pattern.push(this.moves.rightHook);
                this.pattern.push(this.moves.taunt);
                break;
            case 1:
                this.nextAttackDelay = 1200;
                this.pattern.push(this.moves.angryRab);
                this.pattern.push(this.moves.angryRab);
                this.pattern.push(this.moves.rightHook);
                this.pattern.push(this.moves.angryLab);
                this.pattern.push(this.moves.angryLab);
                this.pattern.push(this.moves.leftHook);
                this.pattern.push(this.moves.taunt);
                break;
            case 2:
                this.nextAttackDelay = 1000;
                this.pattern.push(this.moves.angryLook);
                this.pattern.push(this.moves.angryRook);
                this.pattern.push(this.moves.angryLab);
                this.pattern.push(this.moves.angryRab);
                this.pattern.push(this.moves.taunt);
                break;
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