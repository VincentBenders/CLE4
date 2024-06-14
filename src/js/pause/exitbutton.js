import { Actor, Color, Font, FontUnit, Label, Vector } from "excalibur";

export class ExitButton extends Actor {
    constructor(engine) {
        super({
            
            width: 150,
            height: 75,
            color: Color.Red
        });
   
        this.on('pointerdown', () => {
            engine.goToScene('fightscreen')
        });
        this.pos = new Vector(600,500);
        
    }

    onInitialize() {
        this.exitLabel = new Label({
            text: 'EXIT',
            pos: new Vector(-63, -18),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.exitLabel)
    }

    

}