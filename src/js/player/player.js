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
  AnimationStrategy,
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
    this.pos = new Vector(700, 650);
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
    this.graphics.opacity = 0.65;
    this.cooldown = new Timer({
      fcn: () => {
        this.isAttacking = false;
        this.isDodging = false;
        // console.log(this.punch);
        // console.log(this.dodge);
        // this.graphics.use("downLeft");
        this.graphics.use("idle");
        console.log('in timer');
      },
      repeats: false,
      interval: 400,
    });
    this.scene?.add(this.cooldown);
    const PlayerAnimations = SpriteSheet.fromImageSource({
      image: Resources.PlayerSheet,
      grid: {
        rows: 13,
        columns: 7,
        spriteHeight: 256,
        spriteWidth: 256,
      },
      spacing: {},
    });

    const idleFrames = range(28, 29);
    const idle = Animation.fromSpriteSheet(PlayerAnimations, idleFrames, 300);
    // const idle = Animation.fromSpriteSheet(PlayerAnimations, idleFrames, 300);

    this.graphics.add("idle", idle);
    this.graphics.use("idle");

    //attacks
    const dLFrame = range(49, 53);
    const donwLeft = Animation.fromSpriteSheet(PlayerAnimations, dLFrame, 100);
    this.graphics.add("donwLeft", donwLeft);
    // donwLeft.strategy = AnimationStrategy.End;

    const dRFrame = range(56, 60);
    const donwRight = Animation.fromSpriteSheet(PlayerAnimations, dRFrame, 80);
    this.graphics.add("donwRight", donwRight);

    const uLFrame = range(42, 45);
    const upperLeft = Animation.fromSpriteSheet(PlayerAnimations, uLFrame, 80);
    this.graphics.add("upLeft", upperLeft);

    const uRFrame = range(63, 66);
    const upperRight = Animation.fromSpriteSheet(
      PlayerAnimations,
      uRFrame,
      80
    );
    this.graphics.add("upRight", upperRight);

    //defence
    const dLeftFrame = range(7, 11);
    const dodgeLeft = Animation.fromSpriteSheet(
      PlayerAnimations,
      dLeftFrame,
      100
    );
    this.graphics.add("dodgeLeft", dodgeLeft);

    const dRightFrame = range(14, 18);
    const dodgeRight = Animation.fromSpriteSheet(
      PlayerAnimations,
      dRightFrame,
      100
    );
    this.graphics.add("dodgeRight", dodgeRight);

    const duckFrame = range(21, 25);
    const duck = Animation.fromSpriteSheet(PlayerAnimations, duckFrame, 100);
    this.graphics.add("duck", duck);


    const blockFrame = range(0, 2);
    const block = Animation.fromSpriteSheet(PlayerAnimations, blockFrame, 100);
    this.graphics.add("block", block);
    block.strategy = AnimationStrategy.Freeze;
    
    const downFrame = range(0, 2);
    const down = Animation.fromSpriteSheet(PlayerAnimations, downFrame, 100);
    this.graphics.add("down", down);
    down.strategy = AnimationStrategy.Freeze;
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
        Resources.Punch.volume = 1.0;
        Resources.Punch.loop = false;
        Resources.Punch.play(); 
        this.punch = "lower left";
        this.isAttacking = true;
        this.graphics.use("donwLeft");
        this.cooldown.start();
        console.log('after timer');
      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue === 0) {
      if (!this.isAttacking && !this.isDodging) {
        Resources.Punch.volume = 1.0;
        Resources.Punch.loop = false;
        Resources.Punch.play(); 
        this.punch = "lower right";
        this.isAttacking = true;

        this.graphics.use("donwRight");

        this.cooldown.start();
        this.scene.boss.hitWith(this.punch);

      }
    }
    // upper attacks
    if (engine.mygamepad.wasButtonPressed(Buttons.Face2) && yValue < 0) {
      if (!this.isAttacking && !this.isDodging) {
        Resources.Punch.volume = 1.0;
        Resources.Punch.loop = false;
        Resources.Punch.play(); 
        this.punch = "upper right";
        this.isAttacking = true;
        this.graphics.use("upRight");
        this.cooldown.start();
        this.scene.boss.hitWith(this.punch);

      }
    }
    if (engine.mygamepad.wasButtonPressed(Buttons.Face1) && yValue < 0) {
      if (!this.isAttacking && !this.isDodging) {
        Resources.Punch.volume = 1.0;
        Resources.Punch.loop = false;
        Resources.Punch.play(); 
        this.punch = "upper left";
        this.isAttacking = true;
        this.graphics.use("upLeft");
        this.cooldown.start();
        this.scene.boss.hitWith(this.punch);

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
        this.scene.boss.hitWith(this.punch);
        this.superEnergy = 0;
      }
      console.log("supa!");
    }

    // defence
    if (xValue === -1) {
      if (!this.isAttacking && !this.isDodging) {
        this.isDodging = true;
        this.dodge = "left";
        this.graphics.use("dodgeLeft");
        this.cooldown.start();
      }
    }
    if (xValue === 1) {
      if (!this.isAttacking && !this.isDodging) {
        this.isDodging = true;
        this.dodge = "right";
        this.graphics.use("dodgeRight");
        this.cooldown.start();
      }
    }
    if (yValue === 1) {
      if (!this.isAttacking && !this.isDodging) {
        this.isDodging = true;
        this.dodge = "duck";
        this.graphics.use("duck");
        this.cooldown.start();
      }
    }
    if (yValue === -1) {
      if (!this.isAttacking && !this.isDodging) {
        this.dodge = "block";
        this.graphics.use("block");
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

  getDodge() {
    if (this.isDodging) {
      return this.dodge;
    } else {
      return "";
    }
  }

  hitFor(damage) {
    this.health -= damage;

    //Make sure the health doesn't go negative just in case
    if (this.health < 0) {
      this.health = 0;
    }
  }
}
