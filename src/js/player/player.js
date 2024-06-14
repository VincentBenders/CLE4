import { Actor, Axes, Buttons, Engine, Keys, Timer, Vector } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
  game;
  stamina;
  health;
  superEnergy;
  punch;
  dodge;
  exhuasted;
  downed;
  isDown;
  isAttacking;
  isDodging;
  cooldown;
  onInitialize(Engine) {
    this.game = Engine;
    this.graphics.use(Resources.Player.toSprite());
    this.pos = new Vector(700, 700);
    this.stamina = 20;
    this.health = 100;
    this.superEnergy = 0;
    this.downed = 0;
    this.isDown = false;
    this.exhuasted = false;
    this.isAttacking = false;
    this.isDodging = false;
    this.punch = "";
    this.dodge = "";
    this.cooldown = new Timer({
      fcn: () => {
        this.isAttacking = false;
        this.isDodging = false;
        console.log(this.punch);
        console.log(this.dodge);
      },
      repeats: false,
      interval: 600,
    });
    this.scene?.add(this.cooldown);
  }

  //create function to check if previous scene was switch round
  //

  // onActivate(Engine) {
  //   this.game = Engine;
  //   this.graphics.use(Resources.Player.toSprite());
  //   this.pos = new Vector(400, 400);
  //   this.stamina = 20;
  //   this.health = 100;
  //   this.superEnergy = 0;
  //   this.downed = 0;
  //   this.isDown = false;
  //   this.exhuasted = false;
  //   this.isAttacking = false;
  //   this.isDodging = false;
  // }

  onPreUpdate(engine) {
    if (engine.mygamepad === null) {
      console.log("er is geen gamepad");
      return;
    }

    // bewegen
    const xValue = engine.mygamepad.getAxes(Axes.LeftStickX);
    const yValue = engine.mygamepad.getAxes(Axes.LeftStickY);
    console.log("x: ", xValue, "y: ", yValue);
    // attacks
    if (engine.mygamepad.wasButtonPressed(Buttons.Face1) && yValue === 0) {
      if (!this.isAttacking && !this.isDodging) {
        this.punch = "lower left";
        this.isAttacking = true;
        this.cooldown.start();
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue === 0) {
      if (!this.isAttacking && !this.isDodging) {
        this.punch = "lower right";
        this.isAttacking = true;
        this.cooldown.start();
      }
    }
    // upper attacks
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue < 0) {
      if (!this.isAttacking && !this.isDodging) {
        this.punch = "upper right";
        this.isAttacking = true;
        this.cooldown.start();
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face1) && yValue < 0) {
      if (!this.isAttacking && !this.isDodging) {
        this.punch = "upper left";
        this.isAttacking = true;
        this.cooldown.start();
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face3) && yValue === 0) {
      if (this.superEnergy >= 1 && !this.isAttacking && !this.isDodging) {
        this.isAttacking = true;
        if (this.superEnergy === 1) {
          this.punch = "super 1";
        }
        if (this.superEnergy === 2) {
          this.punch = "super 2";
        }
        if (this.superEnergy === 3) {
          this.punch = "super 3";
        }
        this.cooldown.start();
        this.superEnergy = 0;
      }
      console.log("supa!");
    }

    // defence
    if (xValue === -1) {
      if (!this.isAttacking && !this.isDodging) {
        this.isDodging = true;
        this.dodge = "left";
        this.cooldown.start();
      }
    }
    if (xValue === 1) {
      if (!this.isAttacking && !this.isDodging) {
        this.isDodging = true;
        this.dodge = "right";
        this.cooldown.start();
      }
    }
    if (yValue === 1) {
      if (!this.isAttacking && !this.isDodging) {
        this.isDodging = true;
        this.dodge = "duck";
        this.cooldown.start();
      }
    }
    if (yValue === -1) {
      if (!this.isAttacking && !this.isDodging) {
        this.dodge = "block";
        this.cooldown.start();
      }
    }
    if (this.stamina === 0) {
      this.exhuasted = true;
      //check on sucsesive hit then set exhuast to false
    }
    if (this.health === 0) {
      this.isDown = true;
      this.downed++;
      if (this.downed >= 3) {
        //game over
      }
    }
  }
}
