import {Boss} from "./boss.js";
import {Attack} from "./attack.js";
import {animate} from "../resources.js";
import {Move} from "./Move.js";
import {AnimationStrategy} from "excalibur";

export class KasperBoss extends Boss {

    //Properties
    hitsBeforeBlock;

    constructor() {
        super(125, 'kasper');

        //Set properties
        this.hitsBeforeBlock = 5;

        //fill the move object
        this.setMoves();
    }

    setMoves() {
        //kick left
        let kickLeftAnimation = animate(1000, this.spriteSheet, [60, 61, 62, 63, 64]);
        this.moves.kickLeft = new Attack(30, 'rightHook', 7, 1000, 300, kickLeftAnimation, 3);
        //kick right
        let kickRightAnimation = animate(1000, this.spriteSheet, [70, 71, 72, 73, 74]);
        this.moves.kickRight = new Attack(30, 'leftHook', 7, 1000, 300, kickRightAnimation, 3);
        //overhead swing
        let overHeadSwingAnimation = animate(1000, this.spriteSheet, [80, 81, 82, 83, 84]);
        this.moves.overheadSwing = new Attack(30, 'overhead', 7, 1000, 300, overHeadSwingAnimation, 3);
    
        

        let tauntAnimation = animate(2000, this.spriteSheet, [20, 21, 22, 23]);
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

        this.pattern.push(this.moves.kickLeft);
        this.pattern.push(this.moves.overheadSwing);
        this.pattern.push(this.moves.kickRight);
        this.pattern.push(this.moves.kickRight);
        this.pattern.push(this.moves.kickLeft);
        this.pattern.push(this.moves.taunt);
        
    }

    postGetUp() {

        //After kasper gets up, he needs to block sooner
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
