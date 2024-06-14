import {Boss} from "./boss.js";
import {Attack} from "./attack.js";
import {animate} from "../resources.js";
import {Move} from "./Move.js";


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

        let leftHookAnimation = animate(800, this.spriteSheet, [1]);
        this.moves.leftHook = new Attack(15, 'jab', 5, 800, 400, leftHookAnimation);

        let rightHookAnimation = animate(800, this.spriteSheet, [1]);
        this.moves.rightHook = new Attack(15, 'jab', 5, 800, 400, rightHookAnimation);

        let uppercutAnimation = animate(800, this.spriteSheet, [1]);
        this.moves.uppercut = new Attack(30, 'uppercut', 7, 600, 300, uppercutAnimation);

        this.moves.taunt = new Move();

    }

    getUp() {
        super.getUp();

        //After sil gets up, he needs to block sooner
        this.hitsBeforeBlock--;

        //Make sure this number can't go below 0
        if (this.hitsBeforeBlock < 0) {
            this.hitsBeforeBlock = 0;
        }

    }

}