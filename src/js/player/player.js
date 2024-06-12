import { Actor, Engine, Keys, Vector } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor{
    game
    stamina
    health
    superEnergy
    exhuasted
    downed
    isDown
    isAttacking
    isDodging
    onInitialize(Engine){
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
    onActivate(Engine){
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
    

    onPreUpdate(){
        if(this.stamina === 0){
            this.exhuasted = true;
            //check on sucsesive hit then set exhuast to false

        }
        if(this.health === 0){
            this.isDown = true
            this.downed++
            if (this.downed >= 3){
                //game over
            }
        }
    }
}