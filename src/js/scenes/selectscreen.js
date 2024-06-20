import { Buttons, Keys, Scene } from "excalibur";
import { Resources } from "../resources";

export class SelectScreen extends Scene {
    bosses = [
        { name: 'Blub', image: './images/Blub.png' },
        { name: 'sil', image: './placeholders/sil-idle.png' }
    ]

    screen;
    selectedIndex = 0;
    selectedBoss;
    selectBox;

    onActivate() {
        this.renderSelectScreen();
        //Sound initialization
        Resources.Track2.stop();
        Resources.Track1.volume = 0.5;
        Resources.Track1.loop = true;
        Resources.Track1.play();
    }

    renderSelectScreen() {
        this.screen = document.getElementById('ui');
        this.screen.innerHTML = '';
        this.selectBox = document.createElement('div');
        this.screen.appendChild(this.selectBox);
        this.selectBox.setAttribute('id', 'selectbox')

        this.bosses.forEach((boss, index) => {
            const select = document.createElement('div');
            select.classList.add('select'); 
            select.style.display = 'inline-block';
            select.style.margin = '10px';
            select.style.width = '100px'
            select.style.border = this.selectedIndex === index ? '2px solid red' : '2px solid transparent';

            const picture = document.createElement('img');
            picture.src = boss.image;
            picture.alt = boss.name;
            picture.style.width = '100px';
            picture.style.height = '100px';

            select.appendChild(picture);
            this.selectBox.appendChild(select);
        });
    }

    onPreUpdate() {
        // Navigeren door de bosses
        if (this.engine.input.keyboard.wasPressed(Keys.Right)) {
            this.selectedIndex = (this.selectedIndex + 1) % this.bosses.length;
            this.renderSelectScreen();
        }
        if (this.engine.input.keyboard.wasPressed(Keys.Left)) {
            this.selectedIndex = (this.selectedIndex - 1 + this.bosses.length) % this.bosses.length;
            this.renderSelectScreen();
        }

        // Boss selecteren en naar de gevechtsscène gaan
        if (this.engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.selectedBoss = this.bosses[this.selectedIndex];
            this.engine.goToScene('fightscreen', { sceneActivationData: { boss: this.selectedBoss.name} });
            // Hier ga je naar de gevechtsscène met de geselecteerde boss
            
        }

        if (this.engine.mygamepad.getAxes(0) > 0.5) {
            this.selectedIndex = (this.selectedIndex + 1) % this.bosses.length;
            this.renderSelectScreen();
        }
        if (this.engine.mygamepad.getAxes(0) < -0.5) {
            this.selectedIndex = (this.selectedIndex - 1 + this.bosses.length) % this.bosses.length;
            this.renderSelectScreen();
        }

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) {
            this.selectedBoss = this.bosses[this.selectedIndex];
            this.engine.goToScene('fightscreen', { sceneActivationData: { boss: this.selectedBoss.name} });
            // Hier ga je naar de gevechtsscène met de geselecteerde boss
           
        }

        // Terug naar het startscherm
        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }
    }

    onDeactivate() {
        this.screen.innerHTML = ''
    }
}