import { Keys, Scene, Vector } from "excalibur";
import { Label, FontUnit, Font } from "excalibur";
import { Player } from "../player/player";

export class FightScreen extends Scene {
    onInitialize(){
        this.add(new Player());
    }
    
    onActivate() {
        console.log('fightscreen');
    }

}