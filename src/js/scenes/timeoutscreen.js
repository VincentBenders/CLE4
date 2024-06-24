import { Actor, Buttons, Color, Font, FontUnit, Keys, Label, Random, Scene, Vector } from "excalibur";
import { Coach } from "../coach";
import { TimeOutSquare } from "../player/placeholder/timeout-placeholder";
import { Resources } from "../resources";
import { FightScreen } from "./fightscreen";

export class TimeOutScreen extends Scene {

    coach;
    tipLabel;
    square1;
    square2;
    healthBoost;
    tip;


    onInitialize() {
        //Sound initialization
        Resources.Track2.stop();
        Resources.Track1.volume = 0.5;
        Resources.Track1.loop = true;
        Resources.Track1.play();


        this.coach = new Coach(new Vector(150, 600));
        this.add(this.coach)


    }
    onActivate(context) {
        if (context.previousScene instanceof FightScreen) {
            //check of healthrestore availebale is
            if (context.data.healthrestore === 1) {
                this.healthBoost = 1;
            } else {
                this.healthBoost = 0;
            }

        }
        console.log('Context:', context);
        this.context = context;
        // console.log(context.data.player.healthCurrent);
        this.resetTimeOut();
        this.coach.onInitialize(this.engine);

        const random = new Random;
        let bossTip
        switch (context.data.boss.name) {
            case "sil":
                bossTip = this.coach.bossTips[0];
                break;

            case "juno":
                bossTip = this.coach.bossTips[2];
                break;

            case "ginus":
                bossTip = this.coach.bossTips[5];
                break;

            case "sander":
                bossTip = this.coach.bossTips[6]
                break;

            case "chris":
                bossTip = this.coach.bossTips[3]
                break;

            case "kasper":
                bossTip = this.coach.bossTips[4]
                break;

            case "vincent":
                bossTip = this.coach.bossTips[7]
                break;

            case "mathijs":
                bossTip = this.coach.bossTips[1]
                break;

        }

        let coachTip = this.coach.tips[Math.floor(Math.random() * this.coach.tips.length)];
        let randomNumber = random.integer(1, 3)
        if (randomNumber === 1) {
            this.tip = coachTip;
        } else {
            this.tip = bossTip;
        }
        this.tipLabel = new Label({
            text: `${this.tip}`,
            pos: new Vector(250, 600),
            font: new Font({
                family: 'Fantasy, Copperplate',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.add(this.tipLabel);

        let goLabel = new Label({
            text: 'Press Button 3 to continue',
            pos: new Vector(600, 700),
            font: new Font({
                family: 'Fantasy, Copperplate',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(goLabel)

        switch (context.data.boss.name) {
            case "sil":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.SilHeadShot.toSprite());
                break;

            case "juno":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.JunoHeadShot.toSprite());
                break;

            case "ginus":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.GinusHeadShot.toSprite());
                break;

            case "sander":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.CoachFish.toSprite());
                break;

            case "chris":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.ChrisHeadShot.toSprite());
                break;

            case "kasper":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.KasperHeadShot.toSprite());
                break;

            case "vincent":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.CoachFish.toSprite());
                break;

            case "mathijs":
                this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.CoachFish.toSprite());
                break;

        }


        this.square1 = new TimeOutSquare(new Vector(400, 350), Resources.Player.toSprite());
        // this.square2 = new TimeOutSquare(new Vector(1000, 350), Resources.CoachFish.toSprite());
        this.add(this.square1);
        this.add(this.square2);


    }


    onPreUpdate() {


        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face3)) {
            this.engine.goToScene('fightscreen', { sceneActivationData: { player: this.context.data.player, healthboost: this.healthBoost } });
        }

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face4)) {
            this.healthRestore(this.context);
        }


        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }

    }

    healthRestore(context) {
        console.log('heatlh increased')
        // Fucntie kijkt of je een health boost hebt
        if (this.healthBoost === 1) {
            // Zo ja boost deze de player health
            context.data.player.healthCurrent += 40;
            if (context.data.player.healthCurrent > 100) {
                context.data.player.healthCurrent = 100
            }
            this.healthBoost = 0
            console.log(context.data.player.healthCurrent)
            // Zet de healthboost naar 0 na gebruik 
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