import { Actor, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources";
import { ResumeButton } from "../pause/resumebutton.js";
import { OptionsButton } from "../pause/optionsbutton.js";
import { ExitButton } from "../pause/exitbutton.js";

export class PauseScreen extends Scene {


    onInitialize(engine) {


        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Enter) {
                this.engine.goToScene('fightscreen');
            }
        });


    }

    onActivate() {
        console.log('The game is paused')

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
        this.add(new OptionsButton(this.engine));
        this.add(new ExitButton(this.engine));
    }



}
