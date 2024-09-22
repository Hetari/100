<template>
  <div
    ref="canvas"
    id="canvas"></div>
</template>

<script setup lang="ts">
  import P5 from 'p5';
  import { onMounted, ref } from 'vue';

  const canvas = ref<HTMLDivElement | null>();
  const numStars = 800;

  class Star {
    p: P5;
    x: number;
    y: number;

    constructor(p: P5) {
      this.p = p;
      this.x = p.random(-p.width, p.width);
      this.y = p.random(-p.height, p.height);
    }

    show() {
      this.p.fill(255);
      this.p.noStroke();

      // Draw a simple circle for the star
      this.p.ellipse(this.x, this.y, 8, 8);
    }
  }

  onMounted(() => {
    const stars: Star[] = [];

    const myp5 = new P5((sketch: p5) => {
      sketch.setup = () => {
        // Create a canvas that fits the screen
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);

        // Create stars
        for (let i = 0; i < numStars; i++) {
          stars[i] = new Star(sketch);
        }

        sketch.draw = () => {
          sketch.background(0);
          sketch.translate(sketch.width / 2, sketch.height / 2);

          stars.forEach((star) => {
            star.show();
          });
        };
      };
    }, document.getElementById('canvas') as HTMLDivElement);
  });
</script>
