<script setup>
import { onMounted } from 'vue'
import Note from "@/components/Note.vue"

const units = [
    { label: "ronde", value: 1, symbol: "𝅝" }, // semibreve
    { label: "blanche", value: 2, symbol: "𝅗𝅥" }, // minim
    { label: "noire", value: 4, symbol: "𝅘𝅥" }, // crotchet
    { label: "croche", value: 8, symbol: "𝅘𝅥𝅮" }, // quaver
    { label: "double croche", value: 16, symbol: "𝅘𝅥𝅯" }, // semiquaver
    { label: "triple croche", value: 32, symbol: "𝅘𝅥𝅰" }, // demisemiquaver
    { label: "quadruple croche", value: 64, symbol: "𝅘𝅥𝅱" }, // hemidemisemiquaver
    // quintuple croche, 128, 𝅘𝅥𝅲
]

const runTime = (beatNumber) => {
    units.forEach((u) => {
        const items = document.querySelectorAll(`.trackpad__${u.value} .trackpad__beat`)
        items.forEach((i) => i.classList.remove("trackpad__beat--active"))

        const value = Math.ceil(beatNumber * u.value / 64)
        // console.log("Je suis sur", u.value,  value)
        const item = document.querySelector(`.trackpad__${u.value} .trackpad__beat--${value}`)
        if (item) {
            item.classList.add("trackpad__beat--active")
        }
    })

    const newBeat = beatNumber === 64 ? 1 : beatNumber + 1
    setTimeout(runTime.bind(null, newBeat), 1000)
}


onMounted(() => {
    runTime(1)
})
</script>

<template>
    <div class="notation">
        <p>Voici le temps de référence que l'on appelle la noire :</p>
        <Note :value="4" />
        <p>Lorsque l'on raisonne en terme de temps, on prend toujours la noire comme référence. Chaque note possède représente une division d'un tout. La noire est un quart de ce tout. Logiquement, deux noires représentent la moitié de ce tout ; quatre l'entièreté.</p>
        <p>Il y a des temps qui durent plus longtemps qu'une noire, et d'autres qui durent moins longtemps.</p>
        <p>La blanche par exemple, vaut deux noires :</p>
        <Note :value="2" />
        <p>La ronde, elle, vaut deux blanches et donc quatre noires :</p>
        <Note :value="1" />
        <p>Il s'agit de la plus grande valeur de temps.</p>
        <p>En repartant de la noire, on a la croche, qui vaut la moitié d'une noire :</p>
        <Note :value="8" />
        <p>La double croche, vaut la moitié d'une croche et donc le quart d'une noire :</p>
        <Note :value="16" />
        <p>La quadruple croche, vaut la moitié d'une double croche et donc le huitième d'une noire :</p>
        <Note :value="32" />
        <p>Bien qu'il soit techniquement possible d'aller plus loin, il n'est pas nécessaire (et rare) d'aller au-delà de la quadruple croche.</p>

        <p>Pour couvrir une période de quatre temps, il faut donc :</p>
        <ul>
            <li v-for="(note, index) in units">
                <template v-if="index > 0">ou </template>{{ note.value }} {{ note.label }}<template v-if="index > 0">s</template> {{ note.symbol }}
            </li>
        </ul>
        <p>Ce qui donne sous forme de tableau :</p>
        <table>
            <tr v-for="(note) in units">
                <!-- <th>Somme des temps = 4</th> -->
                <td v-for="(duration) in note.value" :colspan="64 / note.value">
                    <!-- {{ note.value }} -->
                    {{ note.symbol }}
                </td>
            </tr>
        </table>

        <section class="trackpad">
            <div v-for="(beat) in units" :class="{ 'trackpad__track': true, [`trackpad__${beat.value}`]: true }">
                <div v-for="(duration, index) in beat.value" :class="{ 'trackpad__beat': true, [`trackpad__beat--${index + 1}`]: true }">
                    {{ beat.symbol }}
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
table {
    text-align: center;
}

td {
    border-bottom: solid 1px grey;
}

.trackpad {
    display: flex;
    flex-direction: column;
}

.trackpad__track {
    display: flex;
    justify-content: center;
}

.trackpad__beat {
    width: 100%;
}

.trackpad__beat--active {
    font-weight: 800;
    color: red;
}
</style>
