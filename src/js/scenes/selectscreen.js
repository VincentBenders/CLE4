import { Buttons, Keys, Scene } from "excalibur";

export class SelectScreen extends Scene {
    bosses = [
        { name: 'Blub', image: './images/Blub.png' },
        { name: 'sil', image: './placeholders/sil-idle.png' }
    ]

    screen;
    selectedIndex = 0;
    selectedBoss;

    onActivate() {
        this.renderSelectScreen();
    }

    renderSelectScreen() {
        this.screen = document.getElementById('ui');
        this.screen.innerHTML = ''

        this.bosses.forEach((boss, index) => {
            const div = document.createElement('div');
            div.style.display = 'inline-block';
            div.style.margin = '10px';
            div.style.border = this.selectedIndex === index ? '2px solid red' : '2px solid transparent';

            const picture = document.createElement('img');
            picture.src = boss.image;
            picture.alt = boss.name;
            picture.style.width = '100px';
            picture.style.height = '100px';

            div.appendChild(picture);
            this.screen.appendChild(div);
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
            // this.engine.goToScene('fightScene', { boss: selectedBoss });
        }

        if (this.engine.mygamepad.getAxes(0) > 0.5) {
            this.selectedIndex = (this.selectedIndex + 1) % this.bosses.length;
            this.renderSelectScreen();
        }
        if (this.engine.mygamepad.getAxes(0) < -0.5) {
            this.selectedIndex = (this.selectedIndex - 1 + this.bosses.length) % this.bosses.length;
            this.renderSelectScreen();
        }

        if (this.engine.mygamepad.wasButtonPressed(Buttons.Face1)) { // A-knop op een Xbox-controller
            this.selectedBoss = this.bosses[this.selectedIndex];
            console.log('Selected Boss:', this.selectedBoss.name);
            // Hier ga je naar de gevechtsscène met de geselecteerde boss
            // this.engine.goToScene('fightScene', { boss: selectedBoss });
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