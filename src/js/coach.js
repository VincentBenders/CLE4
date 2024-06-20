import { Actor, SpriteSheet, Animation, range } from "excalibur";
import { Resources } from "./resources";
// De functie van de Coach is morele support.
// Hij geeft je tips over controls, tactieken en de verschillende bosses

export class Coach extends Actor {

    constructor(pos) {
        super()
        this.pos = pos;
        
    }
    
    tips = [];
    onInitialize(pos) {
        
        // this.graphics.use(Resources.CoachFish.toSprite());

        const CoachFish = SpriteSheet.fromImageSource({
            image: Resources.CoachFish,
            grid: { rows: 1, columns: 2, spriteWidth: 190, spriteHeight: 329 }
        });

        const CoachFrames = range(0, 1);
        const CoachFishAnimation = Animation.fromSpriteSheet(CoachFish, CoachFrames, 500);
        this.graphics.use(CoachFishAnimation);

        this.tips = [
            'Let op je stamina! Als je niks geen stamina hebt kan je niet slaan.', 
            'Sil is een beetje sloom. Maak je geen zorgen om zijn block.',
            'Sla je tegenstanders op bepaalde momenten voor een speciale aanval.',
            'Kijk goed naar de aanvallen. Sommige zijn moeilijker te ontwijken dan anderen'
        ]
    }
}