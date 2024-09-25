<template>
  <main class="flex-center">
    <div ref="canvas" id="canvas"></div>
    <div
      class="items-center justify-between px-[3%] max-sm:grid max-sm:grid-cols-1 sm:flex sm:px-[5%]"
    >
      <h1
        class="w-full text-center font-mono text-[7.5vw] font-bold text-white max-sm:order-last sm:text-4xl lg:text-6xl xl:text-7xl"
      >
        Just coding <br />
        for living
      </h1>

      <div
        class="main max-sm:flex-center relative flex size-fit w-full justify-end"
      >
        <div
          class="absolute left-1/2 top-1/2 size-36 -translate-x-full -translate-y-1/2 bg-green-500 blur-[100px]"
        ></div>
        <img class="w-[45vw]" :src="_2_vue_logo" alt="vuejs logo" />
      </div>
    </div>
  </main>
</template>

<style scoped>
  main,
  .main {
    display: grid;
    & > * {
      grid-row: 1;
      grid-column: 1;
    }
  }
</style>

<script setup lang="ts">
  import { _2_vue_logo } from '../../assets';
  import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';
  import P5 from 'p5';
  import { ref } from 'vue';

  //   P5 object
  let myp5: p5;

  // neighbor type
  type Neighbor = { row: number; col: number; opacity: number };

  //CONSTANTS
  const CELL_SIZE = 50;
  const COLOR_R = 40;
  const COLOR_G = 95;
  const COLOR_B = 130;
  const STARTING_ALPHA = 255;
  const BACKGROUND_COLOR = 31;
  const PROB_OF_NEIGHBOR = 0.5;
  const AMT_FADE_PER_FRAME = 5;
  const STROKE_WEIGHT = 1;

  // VARIABLES
  let colorWithAlpha: p5.Color;
  let numRows: number;
  let numCols: number;
  let currentRow: number = -1;
  let currentCol: number = -1;
  let allNeighbors: Neighbor[] = [];

  const canvas = ref<HTMLDivElement | null>();

  const getRandomNeighbors = (row: number, col: number) => {
    let neighbors: Neighbor[] = [];

    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        let neighborRow = row + dRow;
        let neighborCol = col + dCol;

        let isCurrentCell = dRow === 0 && dCol === 0;

        let isInBounds =
          neighborRow >= 0 &&
          neighborRow < numRows &&
          neighborCol >= 0 &&
          neighborCol < numCols;

        if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
          neighbors.push({
            row: neighborRow,
            col: neighborCol,
            opacity: STARTING_ALPHA,
          });
        }
      }
    }
    return neighbors;
  };

  tryOnMounted(() => {
    myp5 = new P5(
      (sketch: p5) => {
        sketch.setup = () => {
          // Define the setup function here
          sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);

          colorWithAlpha = sketch.color(
            COLOR_R,
            COLOR_G,
            COLOR_B,
            STARTING_ALPHA,
          );
          sketch.noFill();
          sketch.stroke(colorWithAlpha);
          sketch.strokeWeight(STROKE_WEIGHT);

          numRows = sketch.ceil(sketch.windowHeight / CELL_SIZE);
          numCols = sketch.ceil(sketch.windowWidth / CELL_SIZE);
        };

        sketch.draw = () => {
          sketch.background(BACKGROUND_COLOR);
          // Calculate the row and column of the cell that the mouse is currently over
          let row = sketch.floor(sketch.mouseX / CELL_SIZE);
          let col = sketch.floor(sketch.mouseY / CELL_SIZE);

          // check if the mouse has moved to a new cell
          // if yes, getRandomNeighbors to display
          if (row !== currentRow || col !== currentCol) {
            // update the current row and column
            currentRow = row;
            currentCol = col;

            allNeighbors.push(...getRandomNeighbors(row, col));
          }

          let x = row * CELL_SIZE;
          let y = col * CELL_SIZE;

          sketch.stroke(colorWithAlpha);
          sketch.rect(x, y, CELL_SIZE, CELL_SIZE);

          for (let neighbor of allNeighbors) {
            let x = neighbor.row * CELL_SIZE;
            let y = neighbor.col * CELL_SIZE;

            neighbor.opacity = sketch.max(
              0,
              neighbor.opacity - AMT_FADE_PER_FRAME,
            );

            sketch.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
            sketch.rect(x, y, CELL_SIZE, CELL_SIZE);
          }

          allNeighbors = allNeighbors.filter(
            (neighbor) => neighbor.opacity > 0,
          );
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
