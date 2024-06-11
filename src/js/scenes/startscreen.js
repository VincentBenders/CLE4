import { Keys, Scene, Vector } from "excalibur";
import { Label, FontUnit, Font} from "excalibur";

export class StartScreen extends Scene {
    onInitialize(engine){
        console.log("start screen!")
    }

    onPostUpdate(engine){
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.engine.goToScene('fightscreen')
         }
    }

}