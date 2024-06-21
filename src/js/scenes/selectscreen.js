import { Buttons, Color, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources";

export class SelectScreen extends Scene {

    bosses = [
        { name: 'sil', image: './images/time-out-sil.png' },
        { name: 'kasper', image: './time-out-kasper.png' },
        { name: 'ginus', image: './images/time-out-ginus.png' },
        { name: 'juno', image: './time-out-juno.png' },
        { name: 'vincent', image: './placeholders/Placeholder.png' },
        { name: 'chris', image: './time-out-chris.png' },
        { name: 'mathijs', image: './placeholders/Placeholder.png' },
        { name: 'sander', image: './placeholders/Placeholder.png' },
    ]

    screen;
    selectedIndex = 0;
    selectedBoss;
    selectBox;
    lastChangeTime = 0;
    changeCooldown = 500;

    onActivate() {
        console.log('selecting time');
        this.renderSelectScreen();

        //Sound initialization
        Resources.Track2.stop();
        Resources.Track1.volume = 0.5;
        Resources.Track1.loop = true;
        Resources.Track1.play();

        this.title = new Label({
            text: 'Select your opponent!',
            pos: new Vector(600, 300),
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.title);
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
            select.style.width = '100px';
            select.style.border = this.selectedIndex === index ? '2px solid red' : '2px solid transparent';

            const name = document.createElement('p');
            name.textContent = boss.name;
            name.style.textAlign = 'center';
            name.style.color = 'white';


            const picture = document.createElement('img');
            picture.src = boss.image;
            picture.alt = boss.name;
            picture.style.width = '100px';
            picture.style.height = '100px';

            select.appendChild(name);
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
            this.engine.goToScene('fightscreen', { sceneActivationData: { boss: this.selectedBoss.name } });
            // Hier ga je naar de gevechtsscène met de geselecteerde boss

        }

        let currentTime = Date.now();
        if (this.engine.mygamepad.getAxes(0) > 0.5) {
            if (currentTime - this.lastChangeTime > this.changeCooldown) {
                this.selectedIndex = (this.selectedIndex + 1) % this.bosses.length;
                this.renderSelectScreen();
                this.lastChangeTime = currentTime;
            }
        }
        if (this.engine.mygamepad.getAxes(0) < -0.5) {
            if (currentTime - this.lastChangeTime > this.changeCooldown) {
                this.selectedIndex = (this.selectedIndex - 1 + this.bosses.length) % this.bosses.length;
                this.renderSelectScreen();
                this.lastChangeTime = currentTime;
            }
        }

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) {
            this.selectedBoss = this.bosses[this.selectedIndex];
            this.engine.goToScene('fightscreen', { sceneActivationData: { boss: this.selectedBoss.name } });
            // Hier ga je naar de gevechtsscène met de geselecteerde boss

        }

        // Terug naar het startscherm
        if (this.engine.input.keyboard.wasPressed(Keys.Esc)) {
            this.engine.goToScene('startscreen');
        }
    }

    // onDeactivate() {
    //     this.screen.innerHTML = ''
    // }
}