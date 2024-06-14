import { Actor } from "excalibur";
import { Resources } from "./resources";
// De functie van de Coach is morele support.
// Hij geeft je tips over controls, tactieken en de verschillende bosses

export class Coach extends Actor {
    tips = []
    constructor(pos) {
        super()
        // Hierin komt de sprite/animatie.
        // Hier komt de pos van de Coach
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = pos;

    }


    onInitialize() {
        
    }
}