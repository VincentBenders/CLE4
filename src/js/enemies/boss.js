import {Actor, Timer} from "excalibur";


//General boss class, used as a base for all other enemies.
class Boss extends Actor {


    //Properties
    healthCurrent;
    healthMax;
    healthRecover;
    timesDowned;
    timesDownedMax;
    timesDownedCurrentRound;
    vulnerabilityDuration;
    moves;
    pattern;
    stunnedHits;
    stunnedMaxDuration;
    idleAnimation;


    //States
    isInCenter = true;
    isStunned = false;
    isHittableHead = false;
    isHittableBody = false;
    isWindingUp = false;
    isVulnerable = false;
    isDown = false;



    constructor(health, maxDowned) {
        super();

        this.healthMax = health;
        this.healthCurrent = health;
        this.healthRecover = health * 0.75;

        this.timesDownedMax = maxDowned;
        this.timesDowned = 0;
        this.timesDownedCurrentRound = 0;

        this.moves = {};
        this.stunnedHits = 0;
        this.stunnedMaxDuration = 0;

        this.pattern = [];


    }

    //Excalibur methods


    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);


        //Check for health
        if (this.healthCurrent <= 0) {

            this.healthCurrent = 0;
            this.isDown = true;
            this.isInCenter = false;

            this.scene.enemyDowned(this);

        }




    }

    //Custom methods


    //A small function that sets, starts and automatically adds a timer to the scene
    //Parameters: time = time in ms, endFunction = the function to run after the timer ends
    //Returns: nothing
    setTimer(time, endFunction) {

        let timer = new Timer({
            fcn: () => endFunction,
            repeats: false,
            interval: time
        });

        this.scene.add(timer);
        timer.start();

    }




}