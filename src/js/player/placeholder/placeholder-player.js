import { Actor, Resource, Vector } from "excalibur";
import { Resources } from "../../resources";
import { vector } from "excalibur/build/dist/Util/DrawUtil";

export class Placeholder extends Actor {
    onInitialize() {
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(400,400);
        this.vel = new Vector(-10,0);
    }

    onPreUpdate() {
        console.log("count")
    }
}