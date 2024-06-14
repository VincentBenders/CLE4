import { Actor, Color, Font, FontUnit, Label, Vector } from "excalibur";

export class ResumeButton extends Actor {
    constructor(engine) {
        super({
            
            width: 150,
            height: 75,
            color: Color.Green
        });
   
        this.on(engine.mygamepad.wasButtonPressed.Face1, () => {
            engine.goToScene('fightscreen')
        });
        this.pos = new Vector(600,300);
        
    }
    onInitialize() {
        this.resumeLabel = new Label({
            text: 'RESUME',
            pos: new Vector(-63, -18),
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