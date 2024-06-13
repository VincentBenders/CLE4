import { Actor, Axes, Buttons, Engine, Keys, Timer, Vector } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
  game;
  stamina;
  health;
  superEnergy;
  exhuasted;
  downed;
  isDown;
  isAttacking;
  isDodging;
  cooldown;
  onInitialize(Engine) {
    this.game = Engine;
    this.graphics.use(Resources.Player.toSprite());
    this.pos = new Vector(400, 400);
    this.stamina = 20;
    this.health = 100;
    this.superEnergy = 0;
    this.downed = 0;
    this.isDown = false;
    this.exhuasted = false;
    this.isAttacking = false;
    this.isDodging = false;
    this.punch = "";
    this.cooldown = new Timer({
      fcn: () => {
        this.isAttacking = false;
        console.log(this.punch);
      },
      repeats: false,
      interval: 600,
    });
    this.scene?.add(this.cooldown);
  }
  onActivate(Engine) {
    this.game = Engine;
    this.graphics.use(Resources.Player.toSprite());
    this.pos = new Vector(400, 400);
    this.stamina = 20;
    this.health = 100;
    this.superEnergy = 0;
    this.downed = 0;
    this.isDown = false;
    this.exhuasted = false;
    this.isAttacking = false;
    this.isDodging = false;
  }

  onPreUpdate(engine) {
    // console.log(engine.mygamepad);
    if (engine.mygamepad === null) {
      console.log("er is geen gamepad");
      return;
    }

    // bewegen
    const xValue = engine.mygamepad.getAxes(Axes.LeftStickX);
    const yValue = engine.mygamepad.getAxes(Axes.LeftStickY);
    // this.vel = new Vector(xValue * 100, yValue * 100)
    // console.log("x: ", xValue, "y: ", yValue);
    // schieten / springen
    // attacks
    if (engine.mygamepad.wasButtonPressed(Buttons.Face1) && yValue === 0) {
      if (!this.isAttacking) {
        // console.log("left!");
        this.punch = "lower left";
        //   if (!this.isAttacking) {
        // console.log("left attack!");
        this.isAttacking = true;
        this.cooldown.start();
      }
      //   }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue === 0) {
      if (!this.isAttacking) {
        // console.log("right!");
        this.punch = "lower right";
        //   if (!this.isAttacking) {
        // console.log("left attack!");
        this.isAttacking = true;
        this.cooldown.start();
      }
    }
    // upper attacks
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue < 0) {
      if (!this.isAttacking) {
        // console.log("right!");
        this.punch = "upper right";
        //   if (!this.isAttacking) {
        // console.log("left attack!");
        this.isAttacking = true;
        this.cooldown.start();
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face1) && yValue < 0) {
      if (!this.isAttacking) {
        // console.log("left!");
        this.punch = "upper left";
        //   if (!this.isAttacking) {
        // console.log("left attack!");
        this.isAttacking = true;
        this.cooldown.start();
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face3) && yValue === 0) {
      console.log("supa!");
      //   this.isAttacking = true;
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
    // if(){}
  }
}
