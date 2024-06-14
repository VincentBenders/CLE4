import { Actor, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources";
import { ResumeButton } from "./resumebutton";
import { OptionsButton } from "./optionsbutton";
import { ExitButton } from "./exitbutton";

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
            pos: new Vector(500, 150),
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
