import { Actor, Color, Font, FontUnit, Label, Vector } from "excalibur";

export class OptionsButton extends Actor {
    constructor(engine) {
        super({

            width: 150,
            height: 75,
            color: Color.Black
        });

        this.on('pointerdown', () => {
            engine.goToScene('fightscreen')
        });
        this.pos = new Vector(700, 400);

    }
    onInitialize() {
        this.optionsLabel = new Label({
            text: 'OPTIONS',
            pos: new Vector(-63, -18),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.optionsLabel)
    }


}