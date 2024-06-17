import { Actor } from "excalibur";
import { Resources } from "../../resources";

export class TimeOutSquare extends Actor {
    constructor(pos) {
        super()
        this.graphics.use(Resources.Square.toSprite())
        this.pos = pos
    }
}