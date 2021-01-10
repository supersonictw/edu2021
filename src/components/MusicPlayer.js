import * as Tone from 'tone'
import BadApple from "@/assets/audio/level/one/midi/bad_apple.json";
import UNOwenWasHer from "@/assets/audio/level/one/midi/un_owen_was_her.json";

const Music = {
    BadApple: {
        key: "BadApple",
        midi: BadApple,
        opus: "static/audio/level/one/opus/bad_apple.opus"
    },
    UNOwenWasHer: {
        key: "UNOwenWasHer",
        midi: UNOwenWasHer,
        opus: "static/audio/level/one/opus/un_owen_was_her.opus"
    },
}

function MusicPlayer(midi) {
    this.music = null;
    this.synths = [];
    this.playing = false;
    this.isMidi = midi;
}

MusicPlayer.prototype = {
    choose(musicName) {
        if (this.music) {
            this.stop();
        }
        this.music = Music[musicName];
    },
    play() {
        if (!this.music) {
            console.error("No music is chosen");
            return;
        }
        if (this.isMidi) {
            this._playMidi();
        } else {
            this._playOpus();
        }
    },
    _playMidi() {
        this.playing = true;
        for (let track of this.music.midi.tracks) {
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
    _playOpus() {
        this.playing = new Tone.Player(this.music.opus).toDestination();
        this.playing.autostart = true;
    },
    stop() {
        if (this.isMidi) {
            this._stopMidi();
        } else {
            this._stopOpus();
        }
    },
    _stopMidi() {
        while (this.synths.length) {
            const synth = this.synths.shift();
            synth.releaseAll();
            synth.disconnect();
        }
        this.playing = false;
    },
    _stopOpus() {
        this.playing.stop();
        this.playing = false;
    }
}

export {MusicPlayer, Music};
