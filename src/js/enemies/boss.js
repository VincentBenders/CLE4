import {Actor, Timer, Vector} from "excalibur";
import {BossAnimations} from "../resources.js";



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
    nextAttackDelay;
    nextAttackDelayTimer;
    lastHitBy;


    //States
    isInCenter = true;
    isStunned = false;
    isHittableHead = false;
    isHittableBody = false;
    isWindingUp = false;
    isVulnerable = false;
    isDown = false;



    constructor(health, name) {
        super();

        this.name = name;

        this.animations = new BossAnimations(name);

        this.healthMax = health;
        this.healthCurrent = health;
        this.healthRecover = health;

        this.timesDownedMax = 4;
        this.timesDowned = 0;
        this.timesDownedCurrentRound = 0;

        this.counterHits = 0;
        this.stunnedDuration = 0;

        this.nextAttackDelayTimer = new Timer({
            fcn: () => {this.performMove(this.pattern.shift())},
            repeats: false,
            interval: this.nextAttackDelay
        })

        //Place to store all the attacks, taunts and other funky moves
        this.moves = {};
        //The boss' current pattern. Another function will run through it and execute all the moves
        this.pattern = [];

        this.graphics.use(this.animations.idle);

        this.pos = new Vector(720, 450);


    }

    //Excalibur methods


    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);


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
     * @param time - Number in ms
     * @param endFunction - Function to run after the timer ends
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

        //Double check to make sure move parameter is an object
        if (!(move instanceof Object)) {
            return;
        }

        //Apply the move's animation
        this.graphics.use(move.animation);



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

        switch (lastPunch) {
            case 'upLeft': goingDownAnimation = this.animations.goingDownUpLeft; break;
            case 'upRight': goingDownAnimation = this.animations.goingDownUpRight; break;
            case 'downLeft': goingDownAnimation = this.animations.goingDownDownLeft; break;
            case 'downRight': goingDownAnimation = this.animations.goingDownDownRight;
        }

        this.graphics.use(goingDownAnimation);


    }

    getUp() {

        this.isDown = false;

        this.graphics.use(this.animations.getUp);

        this.animations.getUp.events.on('end', () => {this.isInCenter = true})


    }

    resumeIdle() {

        this.graphics.use(this.animations.idle);

    }

    tauntDownedPlayer() {

        this.graphics.use(this.animations.tauntDownedPlayer);

    }



}