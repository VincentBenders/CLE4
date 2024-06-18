import { Actor, Buttons, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Coach } from "../coach";
import { TimeOutSquare } from "../player/placeholder/timeout-placeholder";

export class TimeOutScreen extends Scene {

    coach
    tipLabel
    square1
    square2
    healthBoost
    onInitialize() {
        this.healthBoost = 1;

        this.coach = new Coach(new Vector(150, 600));
        this.add(this.coach)



    }
    onActivate(engine, ctx) {
        console.log('tijd voor een pauze');
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


        this.square1 = new TimeOutSquare(new Vector(400, 350));
        this.square2 = new TimeOutSquare(new Vector(1000, 350));
        this.add(this.square1);
        this.add(this.square2);
        // if (ctx.data.boss === 'sil') {
        //     coach.tips[0];
        // } 


    }


    onPreUpdate(engine, ctx) {
        
        
        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) {
            this.engine.goToScene('fightscreen', { sceneActivationData: { player: ctx.player.health } });
        }

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face2)) {
            this.healthRestore();
        }


        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }

    }

    healthRestore(ctx) {
        console.log('heatlh increased')
        // Fucntie kijkt of je een health boost hebt
        if (this.healthBoost === 1) {
            // Zo ja boost deze de player health
            ctx.player.health + 40;
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