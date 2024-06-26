import {Actor, Random, SpriteSheet, Timer, Vector} from "excalibur";
import {BossAnimations, Resources} from "../resources.js";
import {Move} from "./Move.js";
import {Attack} from "./attack.js";


export class Boss extends Actor {


    //Properties
    healthCurrent;
    healthMax;
    healthRecover;
    timesDowned;
    timesDownedMax;
    timesDownedCurrentRound;
    moves;
    pattern;
    counterHits;
    stunnedDuration;
    animations;
    spriteSheet;
    nextAttackDelay;
    nextAttackDelayTimer;
    nextPatternDelay;
    nextPatternTimer;
    lastHitBy;
    damageInfo;
    missTimer;
    stunnedTimer;
    totalReceivedHits;
    getUpTimer;


    //States
    isInCenter = true;
    isStunned = false;
    isHittableHead = false;
    isHittableBody = false;
    isWindingUp = false;
    isVulnerable = false;
    isDown = false;
    hasMissed = false;


    constructor(health, name) {
        super();

        this.name = name;

        let image;

        let scale;

        switch (name) {
            case 'sil':
                image = Resources.SilSheet;
                scale = 1.05;
                break;
            case 'chris':
                image = Resources.ChrisSheet;
                scale = 1.2;
                break;
            case 'juno':
                image = Resources.JunoSheet;
                scale = 1.15;
                break;
            case 'kasper':
                image = Resources.KasperSheet;
                scale = 1.10;
                break;
            case 'vincent':
                image = Resources.VincentSheet;
                scale = 1.2;
                break;
            case 'ginus':
                image = Resources.GinusSheet;
                scale = 1.05;
                break;
            case 'mathijs':
                image = Resources.MathijsSheet;
                scale = 1.4;
                break;
            case 'sander':
                image = Resources.SanderSheet;
                scale = 1.25;
                break;
            default:
                image = Resources.SilSheet;
        }

        this.scale = new Vector(scale, scale);

        this.spriteSheet = SpriteSheet.fromImageSource({
            image: image,
            grid: {
                rows: 12,
                columns: 10,
                spriteHeight: 256,
                spriteWidth: 256
            }
        });

        this.animations = new BossAnimations(this.spriteSheet, this);

        this.animations.getHit.events.on('end', () => {
            this.resumeIdle();
        });




        this.healthMax = health;
        this.healthCurrent = health;
        this.healthRecover = health;

        this.timesDownedMax = 4;
        this.timesDowned = 0;
        this.timesDownedCurrentRound = 0;

        this.counterHits = 0;
        this.stunnedDuration = 2000;
        this.damageInfo = {
            upperLeft: 5,
            upperRight: 5,
            lowerLeft: 5,
            lowerRight: 5,
            super1: 15,
            super2: 40,
            super3: 75,
        }

        this.nextAttackDelay = 4000;
        this.nextPatternDelay = this.nextAttackDelay * 2;

        this.nextAttackDelayTimer = new Timer({
            fcn: () => {
                if (this.pattern.length <= 0 && !(this.nextPatternTimer.isRunning)) {
                    this.nextPatternTimer.start();
                } else {
                    this.performMove(this.pattern.shift());
                }
            },
            repeats: true,
            interval: this.nextAttackDelay
        });

        this.nextPatternTimer = new Timer({
            fcn: () => {
                this.setNextPattern()
            },
            repeats: false,
            interval: this.nextPatternDelay
        });

        this.missTimer = new Timer({
            fcn: () => {
                this.hasMissed = false;
                this.counterHits = 0;
                this.isHittableHead = false;
                this.isHittableBody = false;
                this.resumeIdle();
            },
            repeats: false,
            interval: this.stunnedDuration
        });

        this.stunnedTimer = new Timer({
            fcn: () => {
                this.isStunned = false;
                this.counterHits = 0;
                this.isHittableHead = false;
                this.isHittableBody = false;
                this.resumeIdle();
            },
            repeats: false,
            interval: this.stunnedDuration
        });


        const random = new Random;
        this.getUpTimer = new Timer({
            random,
            randomRange: [2000, 8000],
            fcn: () => {
                this.getUp();
            },
            repeats: false,
            interval: 1000
        });

        //Place to store all the attacks, taunts and other funky moves
        this.moves = {};
        //The boss' current pattern. Another function will run through it and execute all the moves
        this.pattern = [];

        this.resumeIdle();
        this.pos = new Vector(720, 575);


    }

    //Excalibur methods

    onInitialize(engine) {
        super.onInitialize(engine);

        this.setNextPattern();

        //Add all the timers to the scene
        this.scene.add(this.stunnedTimer);
        this.scene.add(this.missTimer);
        this.scene.add(this.nextAttackDelayTimer);
        this.scene.add(this.nextPatternTimer);
        this.scene.add(this.getUpTimer);

        this.nextAttackDelayTimer.start();

    }


    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        if (this.graphics.current !== this.animations.idle && this.nextAttackDelayTimer.isRunning) {
            this.nextAttackDelayTimer.pause();
        } else if (this.graphics.current === this.animations.idle && !(this.nextAttackDelayTimer.isRunning)) {
            this.nextAttackDelayTimer.resume()
        }

        if (this.isDown && this.graphics.current !== this.animations.goingDown) {
            this.graphics.use(this.animations.goingDown);
            this.animations.goingDown.goToFrame(3, 9000);
        }

        //Check for health

        if (this.healthCurrent <= 0 && !this.isDown) {

            this.healthCurrent = 0;

            this.goDown();


        }


    }

    //Custom methods


    /**
     * A fast way to create and set a timer you won't need again
     * @param time {Number} - Number in ms
     * @param endFunction {Function} - Function to run after the timer ends
     */
    setTimer(time, endFunction) {

        let timer = new Timer({
            fcn: () => endFunction,
            repeats: false,
            interval: time
        });

        this.scene.add(timer);
        timer.start();

    }

    /**
     * Makes the boss perform a move
     * @param move {Object} - Contains all the information about a specific move
     */
    performMove(move) {

        console.log(move);


        //Double check to make sure move parameter is an instance of the move class
        if (!(move instanceof Move) || this.isDown) {
            return;
        }

        //Apply the move's animation
        move.animation.reset();
        this.graphics.use(move.animation);

        //Don't do anything else if the move isn't an attack
        if (!(move instanceof Attack)) {
            return;
        }

        move.animation.events.on('end', () => {
            this.landAttack(move);
        })


    }

    setMoves() {

    }

    resetAttackTimers() {
        this.nextAttackDelayTimer = new Timer({
            fcn: () => {
                if (this.pattern.length <= 0 && !(this.nextPatternTimer.isRunning)) {
                    this.nextPatternTimer.start();
                } else {
                    this.performMove(this.pattern.shift());
                }
            },
            repeats: true,
            interval: this.nextAttackDelay
        });


        this.nextPatternTimer = new Timer({
            fcn: () => {
                this.setNextPattern()
            },
            repeats: false,
            interval: this.nextPatternDelay
        });

    }

    resetStunTimers() {
        this.missTimer = new Timer({
            fcn: () => {
                this.hasMissed = false;
                this.counterHits = 0;
                this.isHittableHead = false;
                this.isHittableBody = false;
                this.resumeIdle();
            },
            repeats: false,
            interval: this.stunnedDuration
        });

        this.stunnedTimer = new Timer({
            fcn: () => {
                this.isStunned = false;
                this.counterHits = 0;
                this.isHittableHead = false;
                this.isHittableBody = false;
                this.resumeIdle();
            },
            repeats: false,
            interval: this.stunnedDuration
        });
    }


    /**
     * Makes the boss go down
     */
    goDown() {

        this.isDown = true;
        this.isInCenter = false;
        this.timesDowned++;
        this.timesDownedCurrentRound++;

        this.animations.goingDown.reset();
        this.graphics.use(this.animations.goingDown);


        this.scene.fighterDowned();

        if (this.timesDowned > this.timesDownedMax) {
            //Once the boss is knocked down more than their max, roll a d10
            const random = new Random;

            let randomNumber = random.integer(1, 10)
            //If the roll is lower than the amount of times they went down, return early so they won't get up
            if (randomNumber <= this.timesDowned) {
                return;
            }

        }

        console.log('Timer getting set...');
        this.getUpTimer.start();


    }

    getUp() {

        console.log('Boss gets up!')
        this.isDown = false;

        this.animations.getUp.reset();
        this.graphics.use(this.animations.getUp);

        this.animations.getUp.events.on('end', () => {
            this.resumeIdle();
        });

        this.healthRecover = this.healthMax - (this.healthMax * (0.1 * this.timesDowned));

        this.healthCurrent = this.healthRecover;
        this.isInCenter = true;


        this.scene.fighterGetsUp();

        this.postGetUp();


    }

    resumeIdle() {

        this.nextAttackDelayTimer.resume();

        this.graphics.use(this.animations.idle);

    }

    tauntDownedPlayer() {

        this.nextAttackDelayTimer.pause();
        this.graphics.use(this.animations.tauntDownedPlayer);

    }

    block() {

        this.animations.block.reset();
        this.graphics.use(this.animations.block);
        this.animations.block.events.on('end', () => {
            this.resumeIdle();
        });
    }

    hitWith(punch) {

        //Don't do anything if the boss isn't in the player's range
        if (!this.isInCenter) {
            return;
        }

        this.lastHitBy = punch;


        //Check if the punch can land
        let hit = false;
        switch (punch) {
            case "lower left":
            case "lower right":
                this.isHittableBody ? hit = true : this.block();
                break;
            case "upper left":
            case "upper right":
                this.isHittableHead ? hit = true : this.block();
                break;
        }

        //If the boss wasn't hit
        if (!hit) {
            //If the player's punch was blocked, reset miss and stun timers, as well as counter hits
            this.hasMissed = false;
            this.missTimer.stop();

            this.isStunned = false;
            this.stunnedTimer.stop();

            this.counterHits = 0;

            this.postOnHit();

            return;
        }

        this.animations.getHit.reset();
        this.graphics.use(this.animations.getHit);

        if (this.hasMissed) {
            this.isStunned = true;

            this.missTimer.stop();
            this.stunnedTimer.start();
        }

        if (this.isStunned && this.counterHits > 0) {
            //Reset the stun timer
            this.stunnedTimer.stop();
            this.stunnedTimer.start();

            this.counterHits--;
        }

        let damage;

        switch (punch) {
            case 'upper left':
                damage = this.damageInfo.upperLeft;
                break;
            case 'upper right':
                damage = this.damageInfo.upperRight;
                break;
            case 'lower right':
                damage = this.damageInfo.lowerLeft;
                break;
            case 'lower left':
                damage = this.damageInfo.lowerRight;
                break;
            case 'super 1':
                damage = this.damageInfo.super1;
                break;
            case 'super 2':
                damage = this.damageInfo.super2;
                break;
            case 'super 3':
                damage = this.damageInfo.super3;
                break;
        }

        this.healthCurrent -= damage;

        this.totalReceivedHits++;

        if (this.counterHits === 0) {
            this.isHittableBody = false;
            this.isHittableHead = false;
        }

        this.postOnHit();

    }


    landAttack(move) {

        //Check if the attack hits
        let hit = false;
        let dodge = this.scene.player.getDodge();
        switch (dodge) {
            case 'left':
                move.affectedAreas.left ? hit = true : hit = false;
                break;
            case 'right':
                move.affectedAreas.right ? hit = true : hit = false;
                break;
            case 'duck':
                move.affectedAreas.down ? hit = true : hit = false;
                break;
            case 'block':
                move.affectedAreas.front ? hit = true : hit = false;
                this.scene.player.stamina--;
                break;
            case '':
                hit = true;
        }

        //If so, apply damage and end the animation early
        if (hit) {
            this.scene.player.hitFor(move.damage);
            if (!this.scene.player.isDown) {
            this.resumeIdle();
            }
            console.log("You've been hit!");
            Resources.Punch.volume = 1.0;
            Resources.Punch.loop = false;
            Resources.Punch.play();
        } else {
            //Otherwise, set condition
            this.hasMissed = true;
            this.counterHits = move.counterHits;
            this.isHittableBody = true;
            this.isHittableHead = true;
            this.missTimer.start();
            console.log("You've dodged an attack!")
        }

    }

    setNextPattern() {

        //Override this function when making a new instance

    }

    postGetUp() {

    }

    postOnPostUpdate() {

    }

    postOnHit() {

    }



}