import * as Tone from 'tone'

function MusicPlayer() {
    this.playing = false;
    this.music= null;
}

MusicPlayer.prototype = {
    choose (musicJson) {
        this.music = musicJson;
    },
    play () {
        if(!this.music) {
            console.error("No music is chosen");
            return;
        }
        this.playing = true;
        this.music.tracks.forEach((track) => {
            if(!this.playing) return;
            const now = Tone.now() + 0.5;
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
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
    stop () {
        this.playing = false;
    }
}


export default MusicPlayer;
