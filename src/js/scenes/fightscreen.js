import { Buttons, Keys, Scene, Vector } from "excalibur";
import { Player } from "../player/player";


export class FightScreen extends Scene {

    // ispaused is er zodat de engine kan kijken of de game al gepauzeerd is

    onInitialize(engine) {
        this.add(new Player());
        // this.add(new Placeholder());

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.P) { 
                console.log('wako');
                this.pauseGame();
            }
        });


        // if(engine.mygamepad.wasButtonPressed(Buttons.Face1)){
        //     console.log('wako');
        //     this.pauseGame();
        // }
    }

    onActivate() {
        console.log('fightscreen');
    }


    pauseGame() {
        this.engine.goToScene('pausescreen');
    }


}