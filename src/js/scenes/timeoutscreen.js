import { Keys, Scene, Vector } from "excalibur";
import { Coach } from "../coach";

export class TimeOutScreen extends Scene {
    constructor() {
        super()
        // In de haakjes naast constructor moeten variabelen komen voor health en aantal downs voor de Boss en player
    }


    onActivate(engine) {
        console.log('tijd voor een pauze');
        this.add(new Coach(new Vector(200,200)));
        
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.engine.goToScene('fightscreen', {sceneActivationData: {boss: 'sil'}});
        }
    }

   
}