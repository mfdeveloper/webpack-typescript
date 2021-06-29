import '../styles/app.scss';
import { AudioEngine } from './audio';
import { Greeter } from './greeter';

const greeter: Greeter = new Greeter('webpack-typescript');
const app = document.getElementById('app');
if (app) {
    greeter.start(app);

    const engine = new AudioEngine();
    engine.createNodes();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    document.addEventListener('click', async () => {
        await engine.resume();
    });

    // Button: White Noise
    const whiteNoiseButton = document.createElement('button');
    whiteNoiseButton.innerText = 'White Noise';

    whiteNoiseButton.addEventListener('click', () => {
        engine.createNodes();
        engine.play();
    });

    // Button: Snare (highpass filter)
    const snareButton = document.createElement('button');
    snareButton.innerText = 'Snare';

    snareButton.addEventListener('click', () => {
        engine.createNodes(true);
        engine.play();
    });

    // Button: Kick Drum (OscilatorNode)
    const kickButton = document.createElement('button');
    kickButton.innerText = 'Kick';

    kickButton.addEventListener('click', () => {
        engine.kickDrum(true);
    });

    document.body.appendChild(whiteNoiseButton);
    document.body.appendChild(snareButton);
    document.body.appendChild(kickButton);
}
