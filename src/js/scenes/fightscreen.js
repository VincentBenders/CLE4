import { Actor, Buttons, Keys, Scene, Timer, Vector } from "excalibur";
import { Label, FontUnit, Font } from "excalibur";
import { Player } from "../player/player";
import { StartScreen } from "./startscreen.js";
import { Background, BoxingRing, Resources } from "../resources.js";
import { SilBoss } from "../enemies/silboss.js";
import { SelectScreen } from "./selectscreen.js";

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

  // ispaused is er zodat de engine kan kijken of de game al gepauzeerd is

  onInitialize(engine) {
    // this.add(new Placeholder());

    //Sound initialization
    Resources.Track1.stop();
    Resources.Track2.volume = 0.5;
    Resources.Track2.loop = true;
    Resources.Track2.play();  

    //Create actors for the background and arena
    this.background = new Background();
    this.boxingRing = new BoxingRing();

    this.add(this.background);
    this.add(this.boxingRing);

    //Create the round timer
    this.roundTimer = new Timer({
      fcn: () => this.roundTimeHandler(),
      repeats: true,
      interval: 500,
    });

    this.add(this.roundTimer);

    //Make sure this.ui is an object
    this.ui = {};

    //Get the ui from the HTML
    this.ui.element = document.getElementById("ui");

    //Create UI elements
    this.createUI();
  }

  onActivate(context) {
    console.log("fightscreen");

    //Check where this scene got called from
    // If it's from the roadmap, set everything up
    if (context.previousScene instanceof SelectScreen || context.previousScene instanceof StartScreen) {
      this.resetFight(context);
    } else {
      // Else if it's from the timeout, do something else
      this.ui.element.style.display = 'flex';
      this.currentRound++;
      this.roundTimer.reset();
    }

    this.roundTimer.start();
  }

  onPreUpdate(engine, delta) {
    super.onPreUpdate(engine, delta);

    this.updateUI();
    
    if(this.engine.mygamepad.wasButtonPressed(Buttons.Face4)) {
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

    //Delete the player and boss in case they were still there
    if (this.boss instanceof Actor) {
      this.boss.kill();
    }

    if (this.player instanceof Actor) {
      this.player.kill();
    }

    //Reset properties
    this.currentRound = 1;
    this.roundTimeRemaining = 180;

    //Set the correct background image

    //Add the player to the scene
    this.player = new Player();

    //Add the correct enemy to the scene, and adjust the background
    switch (context.data.boss) {
      case "sil":
        this.boss = new SilBoss();
        this.background.graphics.use();
        break;
    }

    this.add(this.boss);
    this.add(this.player);

    this.background.setBackgroundImageFor(this.boss.name);
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
      this.engine.goToScene("timeoutscreen", {
        sceneActivationData: { boss: this.boss, player: this.player },
      });
    }
  }

  pauseGame() {
    this.engine.goToScene("pausescreen");
  }
}
