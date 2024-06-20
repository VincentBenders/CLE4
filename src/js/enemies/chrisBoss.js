import {Boss} from "./boss.js";


export class ChrisBoss extends Boss {

    //Properties

    constructor() {
        super(125, 'chris');

        this.nextAttackDelay = 750;

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