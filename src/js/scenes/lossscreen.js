import { Buttons, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources";

export class LossScreen extends Scene {
    constructor() {
        super()
    }

    onActivate(context) {
        //Sound initialization
        Resources.Track2.stop();
        Resources.Track1.volume = 0.5;
        Resources.Track1.loop = true;
        Resources.Track1.play();  

        this.resetLoss()
        this.lossLabel = new Label({
            text: 'YOU LOST',
            pos: new Vector(500, 200),
            font: new Font({
                family: 'Fantasy, Copperplate',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.lossRoundLabel = new Label({
            text: `Round ${context.currentRound}`,
            pos: new Vector(650, 300),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.lossTimeLabel = new Label({
            text: `Time: ${context.roundTime}`,
            pos: new Vector(650, 350),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.lossKoLabel = new Label({
            text: 'KO',// `${kO}`,
            pos: new Vector(650, 400),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(this.lossLabel)
        this.add(this.lossRoundLabel)
        this.add(this.lossTimeLabel)
        this.add(this.lossKoLabel)

        
    }

    onPreUpdate() {
        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) {
            this.engine.goToScene('selectscreen');
        }
    }

    
    resetLoss() {
        if (this.lossLabel instanceof Label) {
            this.lossLabel.kill();
        }
        if (this.lossKoLabel instanceof Label) {
            this.lossKoLabel.kill();
        }
        if (this.lossRoundLabel instanceof Label) {
            this.lossRoundLabel.kill();
        }
        if (this.lossTimeLabel instanceof Label) {
            this.lossTimeLabel.kill();
        }

        
    }
}