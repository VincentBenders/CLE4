import '../css/style.css'
import {Actor, Engine, Vector, DisplayMode, vec} from "excalibur"
import {Resources, ResourceLoader} from './resources.js'
import {StartScreen} from "./scenes/startscreen.js";
import {FightScreen} from "./scenes/fightscreen.js";
import {PauseScreen} from './scenes/pausescreen.js';
import {TimeOutScreen} from './scenes/timeoutscreen.js';
import {SelectScreen} from './scenes/selectscreen.js';
import {WinScreen} from './scenes/winscreen.js';
import {LossScreen} from './scenes/lossscreen.js';


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
            pixelArt: true,
            suppressPlayButton: true
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!");
        this.add('startscreen', new StartScreen())
        this.add('fightscreen', new FightScreen())
        this.add('pausescreen', new PauseScreen())
        this.add('timeoutscreen', new TimeOutScreen())
        this.add('selectscreen', new SelectScreen())
        this.add('winscreen', new WinScreen())
        this.add('lossscreen', new LossScreen())

        this.screen.events.on('resize', () => calculateExPixelConversion(this.screen));
        calculateExPixelConversion(this.screen);

        this.goToScene('startscreen')
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected: ", connectevent.gamepad)
            this.mygamepad = connectevent.gamepad
            console.log(this.mygamepad);
        })
    }
}

const calculateExPixelConversion = (screen) => {
    const origin = screen.screenToPageCoordinates(Vector.Zero);
    const singlePixel = screen.screenToPageCoordinates(vec(1, 0)).sub(origin);
    const pixelConversion = singlePixel.x;
    document.documentElement.style.setProperty('--pixel-conversion', pixelConversion.toString());
}

new Game()
