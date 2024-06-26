import {Actor, Buttons, Keys, Scene, Timer, Vector} from "excalibur";
import {Label, FontUnit, Font} from "excalibur";
import {Player} from "../player/player";
import {StartScreen} from "./startscreen.js";
import {Background, BoxingRing, Resources} from "../resources.js";
import {SilBoss} from "../enemies/silBoss.js";
import {SelectScreen} from "./selectscreen.js";
import {TimeOutScreen} from "./timeoutscreen.js";
import {JunoBoss} from "../enemies/junoBoss.js";
import {GinusBoss} from "../enemies/ginusBoss.js";
import {SanderBoss} from "../enemies/sanderBoss.js";
import {ChrisBoss} from "../enemies/chrisBoss.js";
import {KasperBoss} from "../enemies/kasperBoss.js";
import {MathijsBoss} from "../enemies/mathijsBoss.js";
import {VincentBoss} from "../enemies/vincentBoss.js";
import {PauseScreen} from "./pausescreen.js";
import {Boss} from "../enemies/boss.js";

export class FightScreen extends Scene {
    //Properties
    player;
    boss;
    background;
    boxingRing;
    currentRound;
    roundTimeRemaining;
    roundTimer;
    ui;
    healthRestore;
    winCheckVariabel;
    fighterDownedTimer;

    // ispaused is er zodat de engine kan kijken of de game al gepauzeerd is

    onInitialize(engine) {
        // this.add(new Placeholder());


        //Create actors for the background and arena
        this.background = new Background();
        this.boxingRing = new BoxingRing();

        this.add(this.background);
        this.add(this.boxingRing);

        this.roundTimer = new Timer({
            fcn: () => this.roundTimeHandler(),
            repeats: true,
            interval: 500,
        });

        this.fighterDownedTimer = new Timer({
            fcn: () => this.knockout(),
            repeats: false,
            interval: 10000,
        });


        //Make sure this.ui is an object
        this.ui = {};

        //Get the ui from the HTML
        this.ui.element = document.getElementById("ui");


    }

    onActivate(context) {
        console.log("fightscreen");


        //Create UI elements


        //Check where this scene got called from
        // If it's from the roadmap, set everything up
        if (context.previousScene instanceof SelectScreen || context.previousScene instanceof StartScreen) {
            this.resetFight(context);
        } else if (context.previousScene instanceof TimeOutScreen) {
            // Else if it's from the timeout, do something else
            this.roundTimeRemaining = 180;
            this.player.health = context.data.player.health;
            this.ui.element.style.display = 'flex';
            this.currentRound++;
            this.roundTimer.reset();
            this.healthBoostChange(context);
            console.log(this.currentRound)
        }

        if (context.previousScene instanceof PauseScreen) {
            this.ui.element.style.display = 'flex';
        }

        this.roundTimer.start();
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        this.updateUI();

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face4)) {
            console.log("wako");
            this.pauseGame();
        }

    }

    //Custom methods

    resetFight(context) {
        //Make sure there's a boss selected
        if (context.data.boss === undefined) {
            console.log("Error: No enemy given to scene context data");
            //Go back to the start screen
            this.engine.goToScene("startScreen");
        }

        //Sound initialization
        Resources.Track1.stop();
        Resources.Track2.volume = 0.5;
        Resources.Track2.loop = true;
        Resources.Track2.play();

        switch (context.data.name) {
            case "mathijs":
                this.winCheckVariabel = 2;
                break;
            default:
                this.winCheckVariabel = 1;

        }
        this.healthRestore = 1

        //Delete all previous timers
        for (const timer of this.timers) {
            this.remove(timer);
        }

        //Delete the player and boss in case they were still there
        if (this.boss instanceof Actor) {
            this.boss.kill();
        }

        if (this.player instanceof Actor) {
            this.player.kill();
        }

        //Create the round timer
        this.add(this.fighterDownedTimer);

        this.add(this.roundTimer);

        //Reset properties
        this.currentRound = 1;
        this.roundTimeRemaining = 180;

        //Create player and set it as a property
        this.player = new Player();

        //Create the correct enemy and set it as a property
        switch (context.data.boss) {
            case "sil":
                this.boss = new SilBoss();
                this.player.stamina = 10;
                break;

            case "juno":
                this.boss = new JunoBoss();
                this.player.stamina = 12;
                break;

            case "ginus":
                this.boss = new GinusBoss();
                this.player.stamina = 15;
                break;

            case "sander":
                this.boss = new SanderBoss();
                this.player.stamina = 10;
                break;

            case "chris":
                this.boss = new ChrisBoss();
                this.player.stamina = 8;
                break;
            case "kasper":
                this.boss = new KasperBoss();
                this.player.stamina = 8;
                break;
            case "mathijs":
                this.boss = new MathijsBoss();
                this.player.stamina = 8;
                break;
            case "vincent":
                this.boss = new VincentBoss();
                this.player.stamina = 8;
                break;

        }

        //Add the player and boss to the scene
        this.add(this.boss);
        this.add(this.player);

        //Use the correct background
        this.background.setBackgroundImageFor(this.boss.name);

        //Create the UI after resetting it
        this.resetUi();
        this.createUI();
    }

    createUI() {
        //Player information
        let playerInfo = document.createElement("div");
        playerInfo.id = "playerInfo";

        //Player Health
        let playerHealthContainer = document.createElement("div");
        playerHealthContainer.id = "playerHealthContainer";

        this.ui.playerHealthBar = document.createElement("div");
        this.ui.playerHealthBar.id = "playerHealthBar";

        playerHealthContainer.appendChild(this.ui.playerHealthBar);

        playerInfo.appendChild(playerHealthContainer);

        //Stamina

        let playerStaminaContainer = document.createElement("div");
        playerStaminaContainer.id = "playerStaminaContainer";

        this.ui.playerStaminaText = document.createElement("h2");
        this.ui.playerStaminaText.id = "playerStaminaText";

        playerStaminaContainer.appendChild(this.ui.playerStaminaText);

        playerInfo.appendChild(playerStaminaContainer);

        //Special meter

        let specialMeterContainer = document.createElement("div");
        specialMeterContainer.id = "specialMeterContainer";

        let specialMeter1 = document.createElement("div");
        this.ui.specialMeter1 = specialMeter1;
        specialMeter1.id = "specialMeter1";
        specialMeter1.classList.add("empty");

        let specialMeter2 = document.createElement("div");
        this.ui.specialMeter2 = specialMeter2;
        specialMeter2.id = "specialMeter2";
        specialMeter2.classList.add("empty");

        let specialMeter3 = document.createElement("div");
        this.ui.specialMeter3 = specialMeter3;
        specialMeter3.id = "specialMeter3";
        specialMeter3.classList.add("empty");

        specialMeterContainer.appendChild(specialMeter1);
        specialMeterContainer.appendChild(specialMeter2);
        specialMeterContainer.appendChild(specialMeter3);

        playerInfo.appendChild(specialMeterContainer);

        //Round clock
        let clockContainer = document.createElement("div");
        clockContainer.id = "clockContainer";

        let clock = document.createElement("h2");
        this.ui.clock = clock;
        clock.innerText = "3:00";
        clockContainer.appendChild(clock);

        //Boss info
        let bossInfo = document.createElement("div");
        bossInfo.id = "bossInfo";

        //Boss health
        let bossHealthContainer = document.createElement("div");
        bossHealthContainer.id = "bossHealthContainer";

        this.ui.bossHealthBar = document.createElement("div");
        this.ui.bossHealthBar.id = "bossHealthBar";

        bossHealthContainer.appendChild(this.ui.bossHealthBar);

        bossInfo.appendChild(bossHealthContainer);

        //Add them to the ui
        this.ui.element.appendChild(playerInfo);
        this.ui.element.appendChild(clockContainer);
        this.ui.element.appendChild(bossInfo);
    }

    updateUI() {
        //Update the health bars
        this.ui.bossHealthBar.style.width = `${Math.floor(
            (this.boss.healthCurrent / this.boss.healthMax) * 100
        )}%`;
        this.ui.playerHealthBar.style.width = `${Math.floor(
            (this.player.healthCurrent / this.player.healthMax) * 100
        )}%`;

        //Update the stamina bar
        this.ui.playerStaminaText.innerText = this.player.stamina;

    }

    roundTimeHandler() {
        //Update the timer in the UI
        this.roundTimeRemaining--;

        let extraZero;

        if (this.roundTimeRemaining % 60 < 10) {
            extraZero = 0;
        } else {
            extraZero = "";
        }

        this.ui.clock.innerText = `${Math.floor(
            this.roundTimeRemaining / 60
        )}:${extraZero}${this.roundTimeRemaining % 60}`;

        //Check if the time has reached 0
        if (this.roundTimeRemaining <= 0) {

            this.ui.element.style.display = 'none';

            //If so, end the round immediately
            console.log('Transitioning to timeoutscreen with context:', {
                sceneActivationData: {boss: this.boss, player: this.player, healthrestore: this.healthRestore}
            });
            this.engine.goToScene("timeoutscreen", {
                sceneActivationData: {boss: this.boss, player: this.player, healthrestore: this.healthRestore}
            });
        }

        if (this.roundTimeRemaining <= 0 && this.currentRound === 3) {
            this.loseGame();

        }
    }

    healthBoostChange(context) {
        if (context.data.healthboost === 0) {
            this.healthRestore = 0;
        }
    }

    lossCheck() {
        if (this.player.downed === 3) {
            let lossTimer = new Timer({
                fcn: () => this.loseGame(),
                repeats: false,
                interval: 4000
            });
            this.add(lossTimer);
            lossTimer.start();


        }
    }

    winCheck(winCheckVariabel) {

        if (winCheckVariabel === 1) {

            if (this.boss.timesDownedCurrentRound >= 3) {
                let winTimer = new Timer({
                    fcn: () => this.winGame(),
                    repeats: false,
                    interval: 4000
                });
                this.add(winTimer);
                winTimer.start();
                return true;
            }

        } else if (winCheckVariabel === 2) {

            if (this.boss.timesDowned >= 1) {
                let winTimerMathijs = new Timer({
                    fcn: () => this.winGame(),
                    repeats: false,
                    interval: 4000
                });
                this.add(winTimerMathijs);
                winTimerMathijs.start();
                return true;
            }
        }
    }


    winGame() {
        this.resetUi();
        this.engine.goToScene('winscreen', {
            sceneActivationData: {boss: this.boss, round: this.currentRound, time: this.roundTimeRemaining}
        });
    }

    loseGame() {
        this.resetUi();
        this.engine.goToScene('lossscreen', {
            sceneActivationData: {boss: this.boss, round: this.currentRound, time: this.roundTimeRemaining}
        });

    }

    pauseGame() {
        this.ui.element.style.display = 'none';
        this.engine.goToScene("pausescreen");
    }

    resetUi() {
        const ui = document.getElementById('ui');
        ui.style.display = 'flex';
        ui.innerHTML = '';
    }

    fighterDowned(fighter) {

        if (this.winCheck(this.winCheckVariabel)) {
            return
        }

        if (this.player.isDown) {
            this.boss.tauntDownedPlayer();
        }

        this.roundTimer.pause();

        this.fighterDownedTimer.start();


    }

    fighterGetsUp(fighter) {

        this.fighterDownedTimer.stop();

        if (this.player.isDown) {
            this.boss.resumeIdle();
        } else {
            this.player.graphics.use("idle");
        }

        this.roundTimer.resume();
    }

    knockout() {

        if (this.boss.isDown) {
            this.winGame();
        } else {
            this.loseGame();
        }

    }

}
