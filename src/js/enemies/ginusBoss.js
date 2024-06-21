import {Boss} from "./boss.js";


export class GinusBoss extends Boss {

    //Properties

    constructor() {
        super(75, 'ginus');

        this.nextAttackDelay = 1000;

        this.setMoves();

    }

    //Excalibur methods

    //Custom methods

    setMoves() {

        //Set properties
        this.hitsBeforeBlock = 2;




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