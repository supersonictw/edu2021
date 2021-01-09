import * as Tone from 'tone'

export default (music) => {
    music.tracks.forEach((track) => {
        const now = Tone.now() + 0.5;
        const synth = new Tone.PolySynth(Tone.Synth, {
            envelope: {
                attack: 0.02,
                decay: 0.1,
                sustain: 0.3,
                release: 1,
            },
        }).toDestination();
        track.notes.forEach((note) => {
            synth.triggerAttackRelease(
                note.name,
                note.duration,
                note.time + now,
                note.velocity
            );
        });
    });
}
