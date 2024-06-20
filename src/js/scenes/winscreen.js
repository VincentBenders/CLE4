import { Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources";

export class WinScreen extends Scene {
    round;
    roundTime;
    kO;
    constructor() {
        super()
    }
    onActivate() {
        //Sound initialization
        Resources.Track2.stop();
        Resources.Track1.volume = 0.5;
        Resources.Track1.loop = true;
        Resources.Track1.play();  

        this.resetWin()
        this.winLabel = new Label({
            text: 'YOU WINNN B-)',
            pos: new Vector(500, 200),
            font: new Font({
                family: 'Fantasy, Copperplate',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.winRoundLabel = new Label({
            text: 'round',// `${round}`,
            pos: new Vector(650, 300),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.winTimeLabel = new Label({
            text: 'Time',// `${roundTime}`,
            pos: new Vector(650, 350),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.winKoLabel = new Label({
            text: 'KO',// `${kO}`,
            pos: new Vector(650, 400),
            font: new Font({
                family: 'Serif',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(this.winLabel)
        this.add(this.winRoundLabel)
        this.add(this.winTimeLabel)
        this.add(this.winKoLabel)
    
    }

    onPreUpdate() {
        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }
    }

    
    resetWin() {
        if (this.winLabel instanceof Label) {
            this.winLabel.kill();
        }
        if (this.winRoundLabel instanceof Label) {
            this.winRoundLabel.kill();
        }
        if (this.winTimeLabel instanceof Label) {
            this.winTimeLabel.kill();
        }
        if (this.winKoLabel instanceof Label) {
            this.winKoLabel.kill();
        }


        
    }

}