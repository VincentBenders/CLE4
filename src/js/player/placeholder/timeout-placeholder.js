import { Actor } from "excalibur";
import { Resources } from "../../resources";

export class TimeOutSquare extends Actor {
    constructor(pos, sprite) {
        super()
        this.graphics.use(sprite)
        this.pos = pos
    }
}