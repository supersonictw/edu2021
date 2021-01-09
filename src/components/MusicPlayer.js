import * as Tone from 'tone'

function MusicPlayer() {
    this.music = null;
    this.synths = [];
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
        this.music.tracks.forEach((track) => {
            const now = Tone.now() + 0.5;
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
            this.synths.push(synth);
            track.notes.forEach((note) => {
                synth.triggerAttackRelease(
                    note.name,
                    note.duration,
                    note.time + now,
                    note.velocity
                );
            });
        });
    },
    stop() {
        while (this.synths.length) {
            const synth = this.synths.shift();
            synth.disconnect();
        }
    }
}

export default MusicPlayer;
