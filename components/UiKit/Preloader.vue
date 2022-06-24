<template>
  <div class="preloader">
    <div class="preloader__container">
      <span ref="firstText" class="preloader__text" />
      <span ref="lastText" class="preloader__text" />
    </div>
    <svg id="filters" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="threshold">
          <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const firstText = ref();
const lastText = ref();
const emits = defineEmits(["end"]);

const strokes = ["", "Alexander Andriychuk", "photographer"];
const morphTime = 1.5;
const coolDownTime = 0.25;

let textIndex = strokes.length - 1;
let time;
let morph = 0;
let coolDown = coolDownTime;

function doMorph() {
  morph -= coolDown;
  coolDown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    coolDown = coolDownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction: number) {
  lastText.value.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  lastText.value.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  fraction = 1 - fraction;
  firstText.value.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  firstText.value.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  firstText.value.textContent = strokes[textIndex % strokes.length];
  lastText.value.textContent = strokes[(textIndex + 1) % strokes.length];
}

function doCoolDown() {
  morph = 0;
  lastText.value.style.filter = "";
  lastText.value.style.opacity = "100%";
  firstText.value.style.filter = "";
  firstText.value.style.opacity = "0%";
}

function animate() {
  if (textIndex !== strokes.length + 2) {
    requestAnimationFrame(animate);
    const newTime = new Date().getTime();
    const shouldIncrementIndex = coolDown > 0;
    const dt = (newTime - time) / 1000;
    time = newTime;
    coolDown -= dt;
    if (coolDown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }
      doMorph();
    } else {
      doCoolDown();
    }
  } else {
    emits("end", true);
  }
}

onMounted(() => {
  firstText.value.textContent = strokes[textIndex % strokes.length];
  lastText.value.textContent = strokes[(textIndex + 1) % strokes.length];
  time = new Date().getTime();
  animate();
});
</script>

<style scoped lang="scss">
.preloader {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background: #030303;

  &__container {
    position: absolute;
    margin: auto;
    width: 100vw;
    height: 80pt;
    top: 0;
    bottom: 0;
    -webkit-filter: url(#threshold) blur(0.6px);
    filter: url(#threshold) blur(0.6px);
  }

  &__text {
    position: absolute;
    width: 100%;
    display: inline-block;
    font-size: 40pt;
    text-align: center;
    user-select: none;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    @media (max-width: 768px) {
      font-size: 9vw;
      font-weight: 900;
    }
  }
}
</style>
