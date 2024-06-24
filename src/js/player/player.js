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
import {PlayerAnimation, Resources, animate} from "../resources";

export class Player extends Actor {
    game;
    stamina;
    healthCurrent;
    healthMax;
    superEnergy;
    punch;
    dodge;
    exhuasted;
    downed;
    isDown;
    isAttacking;
    isDodging;
    cooldown;
    fighterDownedToggle;
    gettingUpPresses;
    sheet;

    onInitialize(Engine) {
        this.game = Engine;
        // this.graphics.use(Resources.Player.toSprite());
        this.pos = new Vector(700, 650);
        this.stamina = 20;
        this.healthCurrent = 100;
        this.healthMax = 100;
        this.superEnergy = 0;
        this.downed = 0;
        this.isDown = false;
        this.exhuasted = false;
        this.isAttacking = false;
        this.isDodging = false;
        this.punch = "";
        this.dodge = "";
        this.fighterDownedToggle = true;
        this.gettingUpPresses = 0;
        this.graphics.opacity = 0.65;
        this.cooldown = new Timer({
            fcn: () => {
                this.isAttacking = false;
                this.isDodging = false;
                // console.log(this.punch);
                // console.log(this.dodge);
                // this.graphics.use("downLeft");
                this.graphics.use("idle");
                // console.log('in timer');
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

        this.sheet = PlayerAnimations;

        const idleFrames = range(28, 29);
        const idle = Animation.fromSpriteSheet(PlayerAnimations, idleFrames, 300);
        // const idle = Animation.fromSpriteSheet(PlayerAnimations, idleFrames, 300);

        this.graphics.add("idle", idle);
        this.graphics.use("idle");

        const koFrame = range(35, 39);
        const knockOut = Animation.fromSpriteSheet(PlayerAnimations, koFrame, 500);
        this.graphics.add("knockOut", knockOut);
        knockOut.strategy = AnimationStrategy.Freeze;


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
    //   this.healthCurrent = 100;
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

        if (this.isDown || this.scene.boss.isDown) {

            if (this.fighterDownedToggle) {

                if (engine.mygamepad.wasButtonPressed(Buttons.Face1)) {

                    if (this.isDown) {

                        this.gettingUpPresses++;
                        this.pos.y -= 2;

                    } else {

                        this.healthCurrent++;

                        this.graphics.use(this.sheet.sprites[85]);

                    }

                    this.fighterDownedToggle = false;
                }

            } else {

                if (engine.mygamepad.wasButtonPressed(Buttons.Face2)) {

                    if (this.isDown) {

                        this.gettingUpPresses++;
                        this.pos.y -= 2;

                    } else {

                        this.healthCurrent++;

                        this.graphics.use(this.sheet.sprites[84]);


                    }

                    this.fighterDownedToggle = true;
                }

            }

            if (this.gettingUpPresses >= 40 && this.isDown) {
                this.getUp();
            }

            if (this.healthCurrent > this.healthMax) {
                this.healthCurrent = this.healthMax;
            }

            return
        }

        // bewegen
        const xValue = engine.mygamepad.getAxes(Axes.LeftStickX);
        const yValue = engine.mygamepad.getAxes(Axes.LeftStickY);
        // console.log("x: ", xValue, "y: ", yValue);
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
                this.scene.boss.hitWith(this.punch);
                // console.log('after timer');
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
                this.stamina--
                this.graphics.use("dodgeLeft");
                this.cooldown.start();
            }
        }
        if (xValue === 1) {
            if (!this.isAttacking && !this.isDodging) {
                this.isDodging = true;
                this.dodge = "right";
                this.stamina--
                this.graphics.use("dodgeRight");
                this.cooldown.start();
            }
        }
        if (yValue === 1) {
            if (!this.isAttacking && !this.isDodging) {
                this.isDodging = true;
                this.dodge = "duck";
                this.stamina--
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

    }

    getDodge() {
        if (this.isDodging) {
            return this.dodge;
        } else {
            return "";
        }
    }

    hitFor(damage) {
        this.healthCurrent -= damage;
        console.log(damage);
        console.log(this.healthCurrent);

        //Make sure the healthCurrent doesn't go negative just in case
        if (this.healthCurrent < 0) {
            this.healthCurrent = 0;
        }

        if (this.healthCurrent === 0 && !this.isDown) {
            this.goDown();
        }

    }

    goDown() {
        this.isDown = true;
        this.gettingUpPresses -= (this.downed * 40);
        this.downed++;
        this.graphics.use('knockOut');
        this.pos.y += 80;
        this.scene.lossCheck();

        this.scene.fighterDowned();
    }

    getUp() {
        this.scene.fighterGetsUp();
        this.isDown = false;
        this.gettingUpPresses = 0;
        this.healthCurrent = this.healthMax
        this.graphics.use('idle');
        this.pos.y = 650;
    }


}
