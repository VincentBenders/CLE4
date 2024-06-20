import { Actor, Buttons, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Coach } from "../coach";
import { TimeOutSquare } from "../player/placeholder/timeout-placeholder";
import { Resources } from "../resources";

export class TimeOutScreen extends Scene {

    coach
    tipLabel
    square1
    square2
    healthBoost
    context

   
    onInitialize() {
        //Sound initialization
        Resources.Track2.stop();
        Resources.Track1.volume = 0.5;
        Resources.Track1.loop = true;
        Resources.Track1.play();  

        this.healthBoost = 1;
        this.coach = new Coach(new Vector(150, 600));
        this.add(this.coach)
       

    }
    onActivate(context) {
        console.log('Context:', context);
        this.context = context;
      
        // if (!context || !context.player) {
        //     console.error('Context or player is undefined in TimeOutScreen onActivate');
        //     return;
        // }
        console.log(context.data.player.health);
        this.resetTimeOut();
        
        // console.log(`BOSS: ${ctx.data.boss},
        // PLAYER HEALTH: ${ctx.data.player.healthCurrent}`)

        this.coach.onInitialize(this.engine);
        let coachTip = this.coach.tips[Math.floor(Math.random() * this.coach.tips.length)];
        this.tipLabel = new Label({
            text: `${coachTip}`,
            pos: new Vector(250, 600),
            font: new Font({
                family: 'Fantasy, Copperplate',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.add(this.tipLabel);


        this.square1 = new TimeOutSquare(new Vector(400, 350), Resources.Player.toSprite());
        this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.CoachFish.toSprite());
        this.add(this.square1);
        this.add(this.square2);
      

    }


    onPreUpdate() {
        
        
        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) {
            this.engine.goToScene('fightscreen', { sceneActivationData: { player: this.context.data.player } });
        }

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face2)) {
            this.healthRestore(this.context);
        }


        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }

    }

    healthRestore(context) {
        console.log('heatlh increased')
        // Fucntie kijkt of je een health boost hebt
        if (this.healthBoost === 1 && context && context.data.player) {
            // Zo ja boost deze de player health
           context.data.player.health += 40;
           this.healthBoost = 0
           console.log(context.data.player.health)
           // Zet de healthboost naar 0 na gebruik 
        } else if (this.healthBoost === 0) {
            // Zo niet sluit hij de functie
            close();
        }
    }

    resetTimeOut() {
        if (this.tipLabel instanceof Label) {
            this.tipLabel.kill();
        }

        if (this.square2 instanceof Actor) {
            this.square2.kill();
        }
    }
}