import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScreen } from "./scenes/startscreen.js";
import { FightScreen } from "./scenes/fightscreen.js";
import { PauseScreen } from './scenes/pausescreen.js';
import { TimeOutScreen } from './scenes/timeoutscreen.js';


export class Game extends Engine {
    mygamepad

    constructor() {
        super({ 
            width: 1440,
            height: 900,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            fixedUpdateFps: 60,
            canvasElementId: 'game',
            pixelArt: true
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!");
    this.add('startscreen', new StartScreen())
    this.add('fightscreen', new FightScreen())
    this.add('pausescreen', new PauseScreen())
    this.add('timeoutscreen', new TimeOutScreen())
    this.goToScene('startscreen')
    this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected: ", connectevent.gamepad)
            this.mygamepad = connectevent.gamepad
        })
    }
}

new Game()
