import {Boss} from "./boss.js";


export class JunoBoss extends Boss {

    //Properties

    constructor() {
        super(125, 'juno');

        this.nextAttackDelay = 1500;

        this.setMoves();

    }

    //Excalibur methods

    //Custom methods

    setMoves() {


        //Make sure the animations go back to idle once they end
        for (const [key, move] of Object.entries(this.moves)) {




            move.animation.events.on('end', () => {
                this.setTimer(200, this.resumeIdle);
            });

        }

    }

    setNextPattern() {
        super.setNextPattern();



    }


}