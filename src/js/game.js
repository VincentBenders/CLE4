import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScreen } from "./scenes/startscreen.js";
import { FightScreen } from "./scenes/fightscreen.js";

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!");
    this.add('startscreen', new StartScreen())
    this.add('fightscreen', new FightScreen())
    this.goToScene('startscreen')
    }
}

new Game()
