export class AudioEngine {
    private audioContext: AudioContext;
    private buffer: AudioBuffer;

    // Nodes
    private whiteNoiseNode: AudioBufferSourceNode | undefined;
    private primaryGainNode: GainNode | undefined;

    //Filters
    private snareFilter: BiquadFilterNode | undefined;

    constructor() {
        this.audioContext = new AudioContext();

        this.buffer = this.audioContext.createBuffer(
            1,
            this.audioContext.sampleRate * 1,
            this.audioContext.sampleRate
        );

        const channelData = this.buffer.getChannelData(0);
        console.log(channelData.length);

        for (let i = 0; i < this.buffer.length; i++) {
            channelData[i] = Math.random() * 2 - 1;
        }
    }

    /**
     * Avoid "_AudioContext was not allowed to start_" warning
     * on Google Chrome
     * @returns Promise<void>
     */
    resume(): Promise<void> {
        return this.audioContext.resume();
    }

    kickDrum(removeBackClick = false) {
        const kickOscillatorNode = this.audioContext.createOscillator();
        // Piano middle C = 261.6 hz or 266.1
        kickOscillatorNode.frequency.setValueAtTime(150, 0);
        kickOscillatorNode.frequency.exponentialRampToValueAtTime(
            0.001,
            this.audioContext.currentTime + 0.5
        );

        if (removeBackClick) {
            const kickGain = this.audioContext.createGain();
            kickGain.gain.setValueAtTime(1, 0);

            kickGain.gain.exponentialRampToValueAtTime(
                0.001,
                this.audioContext.currentTime + 0.5
            );

            kickOscillatorNode.connect(kickGain);

            if (this.primaryGainNode) {
                kickGain.connect(this.primaryGainNode);
            }
        } else {
            if (this.primaryGainNode) {
                kickOscillatorNode.connect(this.primaryGainNode);
            }
        }

        kickOscillatorNode.start();
        kickOscillatorNode.stop(this.audioContext.currentTime + 0.5);
    }

    createNodes(applyFilters = false) {
        this.whiteNoiseNode = this.audioContext.createBufferSource();
        this.whiteNoiseNode.buffer = this.buffer;

        this.primaryGainNode = this.audioContext.createGain();
        this.primaryGainNode.gain.setValueAtTime(0.05, 0);

        if (applyFilters) {
            this.createFilters();

            if (this.snareFilter) {
                this.whiteNoiseNode.connect(this.snareFilter);
            }
        } else {
            this.whiteNoiseNode.connect(this.primaryGainNode);
        }

        this.primaryGainNode.connect(this.audioContext.destination);
    }

    createFilters() {
        this.snareFilter = this.audioContext.createBiquadFilter();
        this.snareFilter.type = 'highpass';
        this.snareFilter.frequency.setValueAtTime(1500, 0);

        this.snareFilter.connect(this.primaryGainNode!);
    }

    play(): void {
        this.whiteNoiseNode?.start();
    }
}
