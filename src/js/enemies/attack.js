import {Move} from "./Move.js";


export class Attack extends Move {

    //Properties
    damage;
    affectedAreas;
    counterHits;
    windupDuration;
    hitFrame;



    constructor(damage, type, counterHits, duration, windupDuration, animation, hitFrame) {
        super(animation, duration);

        this.damage = damage;
        this.counterHits = counterHits;
        this.windupDuration = windupDuration;
        this.hitFrame = hitFrame;

        let affectedAreas = {
            left: false,
            right: false,
            front: false,
            down: false
        }

        switch (type) {
            case 'uppercut': case 'overhead': affectedAreas.front = true; affectedAreas.down = true; break;
            case 'rightHook': case 'leftCross': affectedAreas.front = true; affectedAreas.left = true; break;
            case 'leftHook': case 'rightCross': affectedAreas.front = true; affectedAreas.right = true; break;
            case 'clothesline': case 'earClap': affectedAreas.front = true; affectedAreas.left = true; affectedAreas.right = true; break;
            case 'leftUppercut': affectedAreas.front = true; affectedAreas.left = true; affectedAreas.down = true; break;
            case 'rightUppercut': affectedAreas.front = true; affectedAreas.right = true; affectedAreas.down = true; break;
        }

        this.affectedAreas = affectedAreas;




    }





}