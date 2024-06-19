import {AnimationStrategy} from "excalibur";


export class Move {

    animation;
    duration;

    constructor(animation, duration) {

        this.animation = animation;
        this.duration = duration;

        this.animation.strategy = AnimationStrategy.Freeze;

    }

}