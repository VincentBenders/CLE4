import { Actor, Buttons, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources";
import { ResumeButton } from "../pause/resumebutton.js";
import { ExitButton } from "../pause/exitbutton.js";
import { Player } from "../player/player.js";

export class PauseScreen extends Scene {

    onInitialize() {

        this.pauseLabel = new Label({
            text: 'PAUSE',
            pos: new Vector(600, 150),
            font: new Font({
                family: 'Arial',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(this.pauseLabel);

        this.add(new ResumeButton(this.engine));
        this.add(new ExitButton(this.engine));
    }


    onPreUpdate(engine) {
        
        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) {
            engine.goToScene('fightscreen');
        }
        
        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face2)) {
            //Reset the ui and make it visible again
            const ui = document.getElementById('ui');
            ui.style.display = 'flex';
            ui.innerHTML = '';

            //Then go to the scene
            engine.goToScene('selectscreen');
        }

        
    }

    onActivate(ctx) {
        console.log(this.engine.mygamepad)
        if (this.engine.mygamepad === undefined) {
            console.log("er is geen gamepad");

        }

        console.log('The game is paused')

      
    }



}
