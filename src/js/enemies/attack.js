import {Move} from "./Move.js";


export class Attack extends Move {

    //Properties
    damage;
    affectedAreas;
    counterHits;
    windupDuration;



    constructor(damage, type, counterHits, duration, windupDuration, animation) {
        super(animation, duration);

        this.damage = damage;
        this.counterHits = counterHits;
        this.windupDuration = windupDuration;

        let affectedAreas = {
            left: false,
            right: false,
            front: false,
            down: false
        }

        switch (type) {
            case 'uppercut' || 'overhead': affectedAreas.front = true; affectedAreas.down = true; break;
            case 'rightHook' || 'leftCross': affectedAreas.front = true; affectedAreas.left = true; break;
            case 'leftHook' || 'rightCross': affectedAreas.front = true; affectedAreas.right = true; break;
            case 'clothesline' || 'earClap': affectedAreas.front = true; affectedAreas.left = true; affectedAreas.right = true; break;
            case 'leftUppercut': affectedAreas.front = true; affectedAreas.left = true; affectedAreas.down = true; break;
            case 'rightUppercut': affectedAreas.front = true; affectedAreas.right = true; affectedAreas.down = true; break;
        }

        this.affectedAreas = affectedAreas;




    }





}