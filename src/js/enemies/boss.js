import {Actor, SpriteSheet, Timer, Vector} from "excalibur";
import {BossAnimations, Resources} from "../resources.js";
import {Move} from "./Move.js";
import {Attack} from "./attack.js";


export class Boss extends Actor {


    //Properties
    name;
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
    lastHitBy;
    damageInfo;
    missTimer;
    stunnedTimer;


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

        this.spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.SilSheet,
            grid: {
                rows: 8,
                columns: 10,
                spriteHeight: 256,
                spriteWidth: 256
            }
        });

        this.animations = new BossAnimations(this.spriteSheet);

        this.animations.getHit.events.on('end', () => {this.resumeIdle()});

        this.healthMax = health;
        this.healthCurrent = health;
        this.healthRecover = health;

        this.timesDownedMax = 4;
        this.timesDowned = 0;
        this.timesDownedCurrentRound = 0;

        this.counterHits = 0;
        this.stunnedDuration = 0;
        this.damageInfo = {
            upperLeft: 5,
            upperRight: 5,
            lowerLeft: 5,
            lowerRight: 5,
            super1: 15,
            super2: 40,
            super3: 75,
        }

        this.nextAttackDelay = 3000;

        this.nextAttackDelayTimer = new Timer({
            fcn: () => {
                if (this.pattern.length === 0) {
                    this.setNextPattern();
                } else {
                    this.performMove(this.pattern.shift());
                }
            },
            repeats: true,
            interval: this.nextAttackDelay
        });

        this.missTimer = new Timer({
            fcn: () => {
                this.hasMissed = false;
                this.counterHits = 0;
                this.resumeIdle()
            },
            repeats: false,
            interval: this.stunnedDuration
        });

        this.stunnedTimer = new Timer({
            fcn: () => {
                this.isStunned = false;
                this.counterHits = 0;
                this.resumeIdle();
            },
            repeats: false,
            interval: this.stunnedDuration
        });

        //Place to store all the attacks, taunts and other funky moves
        this.moves = {};
        //The boss' current pattern. Another function will run through it and execute all the moves
        this.pattern = [];

        this.setNextPattern();

        this.resumeIdle();
        this.pos = new Vector(720, 450);


    }

    //Excalibur methods

    onInitialize(engine) {
        super.onInitialize(engine);

        //Add all the timers to the scene
        this.scene.add(this.stunnedTimer);
        this.scene.add(this.missTimer);
        this.scene.add(this.nextAttackDelayTimer);

        this.nextAttackDelayTimer.start();

    }


    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        if (this.graphics !== this.animations.idle) {

        }


        //Check for health
        if (this.healthCurrent <= 0) {

            this.healthCurrent = 0;

            this.goDown(this.lastHitBy);

            //Not yet implemented
            // this.scene.enemyDowned(this);

            //Don't do anything else if health is 0
            return;

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

        //Double check to make sure move parameter is an instance of the move class
        if (!(move instanceof Move)) {
            return;
        }

        //Apply the move's animation
        move.animation.reset();
        this.graphics.use(move.animation);

        //Don't do anything else if the move isn't an attack
        if (!(move instanceof Attack)) {
            return;
        }

        move.animation.events.on('frame', (frame) => {
            if (frame.frameIndex === move.hitFrame) {
                this.landAttack(move);
            }
        })


    }


    /**
     * Makes the boss go down
     * @param lastPunch {String} - The last punch that hit the boss
     */
    goDown(lastPunch) {

        this.isDown = true;
        this.isInCenter = false;

        //Use correct animation based on the last punch
        let goingDownAnimation;

        // switch (lastPunch) {
        //     case 'upLeft': goingDownAnimation = this.animations.goingDownUpLeft; break;
        //     case 'upRight': goingDownAnimation = this.animations.goingDownUpRight; break;
        //     case 'downLeft': goingDownAnimation = this.animations.goingDownDownLeft; break;
        //     case 'downRight': goingDownAnimation = this.animations.goingDownDownRight;
        // }

        goingDownAnimation = this.animations.goingDown;

        goingDownAnimation.reset();
        this.graphics.use(goingDownAnimation);


    }

    getUp() {

        this.isDown = false;

        this.animations.getUp.reset();
        this.graphics.use(this.animations.getUp);

        this.animations.getUp.events.on('end', () => {
            this.isInCenter = true
        })


    }

    resumeIdle() {

        this.nextAttackDelayTimer.resume();

        this.graphics.use(this.animations.idle);

    }

    tauntDownedPlayer() {

        this.graphics.use(this.animations.tauntDownedPlayer);

    }

    block() {

        this.animations.block.reset();
        this.graphics.use(this.animations.block);

        this.setTimer(200, (() => {
            this.resumeIdle();
        }))

    }

    hitWith(punch) {

        //Don't do anything if the boss isn't in the player's range
        if (!this.isInCenter) {
            return;
        }

        //Check if the punch can land
        let hit = false;
        switch (punch) {
            case 'lower left' || 'lower right':
                this.isHittableBody ? hit = true : this.block();
                break;
            case 'upper left' || 'upper right':
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

            this.counterHits--
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

        this.lastHitBy = punch;

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
                break;
            case '':
                hit = true;
        }

        //If so, apply damage and end the animation early
        if (hit) {
            this.scene.player.hitFor(move.damage);
            this.resumeIdle();
        } else {
            //Otherwise, set condition
            this.hasMissed = true;
            this.counterHits = move.counterHits;
            this.missTimer.start();
        }

    }

    setNextPattern() {

        //Override this function when making a new instance

    }


}