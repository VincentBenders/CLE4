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
        //idle
        let idleAnimation = animate(1000, this.spriteSheet, [0, 1, 2, 3]);
        this.moves.uppercut = new Attack(30, 'idle', 7, 1000, 300, idleAnimation, 3);
        //goingdown
        let goingDownAnimation = animate(1000, this.spriteSheet, [5, 6, 7, 8]);
        this.moves.uppercut = new Attack(30, 'goingdown', 7, 1000, 300, goingDownAnimation, 3);
        //getup
        let getUpAnimation = animate(1000, this.spriteSheet, [15, 16, 17, 18]);
        this.moves.uppercut = new Attack(30, 'getup', 7, 1000, 300, getUpAnimation, 3);
        //gethit
        let getHitAnimation = animate(1000, this.spriteSheet, [20, 21]);
        this.moves.uppercut = new Attack(30, 'gethit', 7, 1000, 300, getHitAnimation, 3);
        //block
        let blockAnimation = animate(1000, this.spriteSheet, [25, 26]);
        this.moves.uppercut = new Attack(30, 'block', 7, 1000, 300, blockAnimation, 3);


        //kick left
        let kickLeftAnimation = animate(1000, this.spriteSheet, [30, 31, 32, 33, 34]);
        this.moves.uppercut = new Attack(30, 'kickleft', 7, 1000, 300, kickLeftAnimation, 3);
        //kick right
        let kickRightAnimation = animate(1000, this.spriteSheet, [35, 36, 37, 38, 39]);
        this.moves.uppercut = new Attack(30, 'kickright', 7, 1000, 300, kickRightAnimation, 3);
        //overhead swing
        let overHeadSwingAnimation = animate(1000, this.spriteSheet, [40, 41, 42, 43]);
        this.moves.uppercut = new Attack(30, 'overheadswing', 7, 1000, 300, overHeadSwingAnimation, 3);
    
        

        let tauntAnimation = animate(2000, this.spriteSheet, [10, 11, 12]);
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
