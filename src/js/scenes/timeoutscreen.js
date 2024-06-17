import { Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Coach } from "../coach";
import { TimeOutSquare } from "../player/placeholder/timeout-placeholder";

export class TimeOutScreen extends Scene {
   

    healthBoost
    onInitialize() {
        this.healthBoost = 1;
        let square1 = new TimeOutSquare(new Vector(400,350));
        let square2 = new TimeOutSquare(new Vector(1000,350));
        this.add(square1);
        this.add(square2);
        
    }

    onActivate(engine, ctx) {

        console.log('tijd voor een pauze');
        // console.log(`BOSS: ${ctx.data.boss},
        // PLAYER HEALTH: ${ctx.data.player.healthCurrent}`)
        let coach = new Coach(new Vector(150, 600));
        this.add(coach)
        coach.onInitialize(engine);
        let coachTip = coach.tips[Math.floor(Math.random() * coach.tips.length)];
        // if (ctx.data.boss === 'sil') {
        //     coach.tips[0];
        // } 
        let tipLabel = new Label({
            text: `${coachTip}`,
            pos: new Vector(250, 600),
            font: new Font({
                family: 'Fantasy, Copperplate',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(tipLabel);

    }


    onPreUpdate(engine, ctx) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.engine.goToScene('fightscreen', { sceneActivationData: { player: ctx.player.health} });
        }

        if (engine.input.keyboard.wasPressed(Keys.Minus)) {
            this.healthRestore();
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
}