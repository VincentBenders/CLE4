import { Buttons, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources";

export class WinScreen extends Scene {
    round;
    roundTime;
    kO;
    constructor() {
        super()
    }
    onActivate(context) {
        //Sound initialization
        Resources.Track2.stop();
        Resources.Track1.volume = 0.5;
        Resources.Track1.loop = true;
        Resources.Track1.play();  

        this.resetWin()
        this.winLabel = new Label({
            text: 'YOU WIN',
            pos: new Vector(550, 200),
            font: new Font({
                family: 'Fantasy, Copperplate',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.winBossLabel = new Label({
            text: `You beat: ${context.data.boss.name}!`,
            pos: new Vector(600, 300),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.winRoundLabel = new Label({
            text: `Round: ${context.data.round}`,
            pos: new Vector(600, 350),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.winTimeLabel = new Label({
            text: `Time: ${context.data.time}`,
            pos: new Vector(600, 400),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.add(this.winLabel)
        this.add(this.winBossLabel)
        this.add(this.winRoundLabel)
        this.add(this.winTimeLabel)
  
    
    }

    onPreUpdate() {
        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }
        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) {
            this.engine.goToScene('selectscreen');
        }

    }

    
    resetWin() {
        if (this.winLabel instanceof Label) {
            this.winLabel.kill();
        }
        if (this.winBossLabel instanceof Label) {
            this.winBossLabel.kill();
        }
        if (this.winRoundLabel instanceof Label) {
            this.winRoundLabel.kill();
        }
        if (this.winTimeLabel instanceof Label) {
            this.winTimeLabel.kill();
        }
        


        
    }

}