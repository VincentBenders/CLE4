import { Buttons, Color, Keys, Scene, Vector } from "excalibur";
import { Label, FontUnit, Font } from "excalibur";

export class StartScreen extends Scene {
    onInitialize(engine) {
        console.log("start screen!")

        this.startLabel = new Label({
            text: 'PUNCHPARK',
            pos: new Vector(550, 150),
            font: new Font({
                family: 'Serif',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(this.startLabel)

        this.startButton = new Label({
            text: 'PRESS SPACE TO START',
            pos: new Vector(550, 250),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(this.startButton)

        this.creditsLabel = new Label({
            text: 'Made by Sander Landmeter, Juno Craane, Sil van Gemeren, Vincent Benders, Chris Tang, Kasper de Jong, Mathijs van der Meijde en Ginus van der Zee',
            pos: new Vector(270, 800),
            font: new Font({
                family: 'Serif',
                size: 15,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(this.creditsLabel)
       
    }


    onPostUpdate(engine){
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.engine.goToScene('selectscreen');
        }

        if (engine.input.keyboard.wasPressed(Keys.V)) {
            this.engine.goToScene('fightscreen', {sceneActivationData: {boss: 'sil'}});
        }

        if(engine.input.keyboard.wasPressed(Keys.Digit1)) {
            this.engine.goToScene('timeoutscreen');
        }

        if(engine.input.keyboard.wasPressed(Keys.Digit2)) {
            this.engine.goToScene('winscreen');
        }

        if(engine.input.keyboard.wasPressed(Keys.Digit3)) {
            this.engine.goToScene('lossscreen');
        }
    }

}