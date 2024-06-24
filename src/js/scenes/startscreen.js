import { Scene, Sprite, Vector, Label, FontUnit, Font, Color, Keys, Buttons } from "excalibur";
import { Resources } from "../resources";

export class StartScreen extends Scene {
    sprite;

    onInitialize(engine) {
        Resources.Startscreen.load().then(() => {
            this.sprite = new Sprite({
                image: Resources.Startscreen,
                sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
            });
            this.sprite.scale = new Vector(1, 1);
        });

        console.log("start screen!");

        this.startLabel = new Label({
            text: 'PUNCHPARK',
            pos: new Vector(500, 150),
            font: new Font({
                family: 'Serif',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.startLabel);

        this.startButton = new Label({
            text: 'PRESS BUTTON 1 TO START',
            pos: new Vector(480, 250),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.startButton);

        this.creditsLabel = new Label({
            text: 'Made by Sander Landmeter, Juno Craane, Sil van Gemeren, Vincent Benders, Chris Tang, Kasper de Jong, Mathijs van der Meijde en Ginus van der Zee',
            pos: new Vector(270, 800),
            font: new Font({
                family: 'Arial',
                size: 20,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.creditsLabel);
    }

    draw(ctx, delta) {
        if (this.sprite) {
            this.sprite.draw(ctx, 0, 0);
        }

        super.draw(ctx, delta);
    }

    onPostUpdate(engine) {
        if (engine.mygamepad && engine.mygamepad.wasButtonPressed(Buttons.Face1) || engine.input.keyboard.wasPressed(Keys.A)) {
            engine.goToScene('selectscreen');
        }

        if (engine.input.keyboard.wasPressed(Keys.V)) {
            engine.goToScene('fightscreen', { 
                sceneActivationData: { boss: 'sil' }
             });
        }

        if (engine.input.keyboard.wasPressed(Keys.Digit1)) {
            engine.goToScene('timeoutscreen');
        }

        if (engine.input.keyboard.wasPressed(Keys.Digit2)) {
            engine.goToScene('winscreen', { 
                sceneActivationData: { boss: "sil", round: 2, time: 100 }
             });
        }

        if (engine.input.keyboard.wasPressed(Keys.Digit3)) {
            engine.goToScene('lossscreen', { 
                sceneActivationData: { boss: "sil", round: 2, time: 100 }
             });
        }
    }
}
