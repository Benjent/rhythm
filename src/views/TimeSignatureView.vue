<script setup>
import { onMounted } from 'vue'
import Vex from "vexflow"

const { Factory } = Vex.Flow;

onMounted(() => {
    const vf = new Factory({ renderer: { elementId: 'output' } });
    const score = vf.EasyScore();
    const system = vf.System();

    // Create a 4/4 treble stave and add two parallel voices.
    // system.addStave({
    //     voices: [
    //         // Top voice has 4 quarter notes with stems up.
    //         score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
    //         score.voice(score.notes('C#4/h, C#4', { stem: 'down' }))
    //     ]
    // }).addClef('treble').addTimeSignature('4/4');
    system.addStave({
        voices: [
            score.voice(score.notes('G4/q, G4, G4, G4', { stem: 'up' })),
        ]
    }).addTimeSignature('4/4');

    vf.draw()

    const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    const div = document.getElementById("output3");
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    const context = renderer.getContext()

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Create the notes
    const notes = [
        // A quarter-note C.
        new StaveNote({ keys: ["G/4"], duration: "q" }),

        // // A quarter-note D.
        // new StaveNote({ keys: ["d/4"], duration: "q" }),

        // // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // // position of the rest.
        // new StaveNote({ keys: ["b/4"], duration: "qr" }),

        // // A C-Major chord.
        // new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
    ];

    // Create a voice in 4/4 and add above notes
    // const voice = new Voice({ num_beats: 4, beat_value: 4 });
    const voice = new Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Render voice
    voice.draw(context, stave);
})
</script>

<template>
    <div class="timeSignature">
        <div id="output" />
        <div id="output2" />
        <div id="output3" />
    </div>
</template>

<style scoped>
</style>
