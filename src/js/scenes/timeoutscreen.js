import { Scene } from "excalibur";

export class TimeOutScreen extends Scene {
    constructor() {
        super()
        // In de haakjes naast constructor moeten variabelen komen voor health en aantal downs voor de Boss en player
    }


    onActivate() {
        console.log('tijd voor een pauze');
    }

    // In het TimeOuScreen zie je de player en de Boss. 
    // Ook is er een Coach, deze geeft je tips afhankelijk van de Boss.
    // Ik heb om dit te maken nog een aparte background nodig.
    // Ook heb ik sprites nodig voor de Coach en aparte sprites voor de player en de Boss.
    // Er komt een tekstvak waarin de tip wordt weergegeven.
    // Er moet ook een indicatie van welke Boss het is. Zodat de juiste sprites worden gebruikt.
    // Waarden zoals aantal keer gedowned moeten opgeslagen worden
}