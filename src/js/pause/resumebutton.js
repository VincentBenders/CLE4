import { Actor, Buttons, Color, Font, FontUnit, Label, Vector } from "excalibur";

export class ResumeButton extends Actor {
    constructor(engine) {
        super({
            
            width: 150,
            height: 75,
            color: Color.Green
        });
   
        
        this.on('pointerdown', () => {
            engine.goToScene('fightscreen')
        });
        this.pos = new Vector(700,300);
        
    }
    onInitialize() {
        
        this.resumeLabel = new Label({
            text: 'RESUME',
            pos: new Vector(-65, -20),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.resumeLabel)
    }

    

}