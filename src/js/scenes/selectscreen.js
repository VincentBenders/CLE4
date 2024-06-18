import { Keys, Scene } from "excalibur";

export class SelectScreen extends Scene {

    onActivate() {
        
    }

    onPreUpdate() {
        if(this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }
    }
}