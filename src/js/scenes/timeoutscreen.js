import { Scene } from "excalibur";

export class TimeOutScreen extends Scene {
    onActivate() {
        console.log('tijd voor een pauze');
    }

    // In het TimeOuScreen zie je de player en de Boss. 
    // Ook is er een Coach, deze geeft je tips afhankelijk van de Boss.
    // Ik heb om dit te maken nog een aparte background nodig.
    // Ook heb ik sprites nodig voor de Coach en aparte sprites voor de player en de Boss.
    // Er komt een tekstvak waarin de tip wordt weergegeven.
}