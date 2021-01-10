import * as Tone from 'tone'

function MusicPlayer() {
    this.music = null;
    this.synths = [];
    this.playing = false;
}

MusicPlayer.prototype = {
    choose(musicJson) {
        if (this.music) {
            this.stop();
        }
        this.music = musicJson;
    },
    play() {
        if (!this.music) {
            console.error("No music is chosen");
            return;
        }
        this.playing = true;
        for (let track of this.music.tracks) {
            if (!this.playing) break;
            const now = Tone.now() + 0.5;
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
            this.synths.push(synth);
            for (let note of track.notes) {
                synth.triggerAttackRelease(
                    note.name,
                    note.duration,
                    note.time + now,
                    note.velocity
                );
            }
        }
    },
    stop() {
        this.playing = false;
        while (this.synths.length) {
            const synth = this.synths.shift();
            synth.releaseAll();
            synth.dispose();
            synth.disconnect();
        }
    }
}

export default MusicPlayer;
