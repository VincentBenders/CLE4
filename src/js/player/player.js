import {
  Actor,
  Axes,
  Buttons,
  Engine,
  Keys,
  Animation,
  SpriteSheet,
  Timer,
  Vector,
  range,
} from "excalibur";
import { PlayerAnimation, Resources, animate } from "../resources";

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
  PlayerAnimations;
  onInitialize(Engine) {
    this.game = Engine;
    // this.graphics.use(Resources.Player.toSprite());
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
        this.graphics.use("idle");
      },
      repeats: false,
      interval: 600,
    });
    this.scene?.add(this.cooldown);
    const PlayerAnimations = SpriteSheet.fromImageSource({
      image: Resources.PlayerSheet,
      grid: {
        rows: 7,
        columns: 11,
        spriteHeight: 265,
        spriteWidth: 265,
      },
      spacing: {},
    });

    const idleFrames = range(0, 5);
    const idle = Animation.fromSpriteSheet(PlayerAnimations, idleFrames, 100);
    this.graphics.add("idle", idle);
    this.graphics.use("idle");

    //attacks
    const attFrame = range(0, 5);
    const donwLeft = Animation.fromSpriteSheet(PlayerAnimations, attFrame, 100);
    this.graphics.add("donwLeft", donwLeft);

    const donwRight = Animation.fromSpriteSheet(
      PlayerAnimations,
      attFrame,
      100
    );
    this.graphics.add("donwRight", donwRight);

    const upLeft = Animation.fromSpriteSheet(PlayerAnimations, attFrame, 100);
    this.graphics.add("upLeft", upLeft);

    const upRight = Animation.fromSpriteSheet(PlayerAnimations, attFrame, 100);
    this.graphics.add("upRight", upRight);

    //defence
    const dodgeLeft = Animation.fromSpriteSheet(
      PlayerAnimations,
      attFrame,
      100
    );
    this.graphics.add("dodgeLeft", dodgeLeft);

    const dodgeRight = Animation.fromSpriteSheet(
      PlayerAnimations,
      attFrame,
      100
    );
    this.graphics.add("dodgeRight", dodgeRight);

    const duck = Animation.fromSpriteSheet(PlayerAnimations, attFrame, 100);
    this.graphics.add("duck", duck);
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
        this.graphics.use("donwLeft");
        this.cooldown.start();
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue === 0) {
      if (!this.isAttacking && !this.isDodging) {
        this.punch = "lower right";
        this.isAttacking = true;

        this.graphics.use("donwRight");

        this.cooldown.start();
      }
    }
    // upper attacks
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue < 0) {
      if (!this.isAttacking && !this.isDodging) {
        this.punch = "upper right";
        this.isAttacking = true;
        this.graphics.use("upRight");
        this.cooldown.start();
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face1) && yValue < 0) {
      if (!this.isAttacking && !this.isDodging) {
        this.punch = "upper left";
        this.isAttacking = true;
        this.graphics.use("upLeft");
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
