<template>
  <div ref="canvas" id="canvas"></div>
</template>

<script setup lang="ts">
  import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';
  import P5 from 'p5';
  import { ref } from 'vue';

  //   P5 object
  let myp5: p5;

  //CONSTANTS
  const CELL_SIZE = 40;
  const COLOR_R = 79;
  const COLOR_G = 38;
  const COLOR_B = 233;
  const STARTING_ALPHA = 255;
  const BACKGROUND_COLOR = 31;
  const PROB_OF_NEIGHBOR = 0.5;
  const AMT_FADE_PER_FRAME = 5;
  const STROKE_WEIGHT = 1;

  const canvas = ref<HTMLDivElement | null>();

  tryOnMounted(() => {
    // we have tow different ways to do this

    // 1 - this called a  TypeScript Type Annotations:
    // myp5 = new P5(
    //   (sketch: p5) => {
    //     sketch.setup = () => {
    //       // code
    //     };
    //   },
    //   document.getElementById('canvas') as HTMLDivElement,
    // );

    // 2 -  No Explicit Type Annotations
    myp5 = new P5(
      (sketch) => {
        sketch.setup = () => {
          // Define the setup function here
          sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        };

        sketch.draw = () => {
          sketch.background(123);
        };

        // Automatically adjust the canvas when the window is resized
        sketch.windowResized = () => {
          sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        };
      },
      document.getElementById('canvas') as HTMLDivElement,
    );
  });

  tryOnUnmounted(() => {
    myp5.remove();
  });
</script>
