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
    bossTips = [];
    onInitialize(pos) {

        const CoachFish = SpriteSheet.fromImageSource({
            image: Resources.CoachFish,
            grid: { rows: 1, columns: 2, spriteWidth: 190, spriteHeight: 329 }
        });

        const CoachFrames = range(0, 1);
        const CoachFishAnimation = Animation.fromSpriteSheet(CoachFish, CoachFrames, 500);
        this.graphics.use(CoachFishAnimation);

        this.tips = [
            'Let op je stamina! Als je niks geen stamina hebt kan je niet slaan.',
            'Sla je tegenstanders op bepaalde momenten voor een speciale aanval.',
            'Kijk goed naar de aanvallen. Sommigen zijn moeilijker te ontwijken dan anderen',
            'Dodge en counter, Dodge en counter!'

        ]

        this.bossTips = [
            'Sil valt niet veel aan, dus je hoeft niet erg opteletten',
            'Mathijs hoef je maar 1 keer neer te slaan',
            'Juno kan god dodgen, wacht tot hij aanvlt',
            'Chris wordt snel moe.',
            'Kasper slaat hard. Dus pas op',
            'Hoe meer Ginus word neer geslaagd, hoe sneller hij aanvalt',
            'Sander is erg sterk. Onderschat hem niet',
            'Vincent is best bizar. Pas op voor zijn vele armen',
        ]
    }
}