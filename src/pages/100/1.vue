<template>
  <div
    ref="canvas"
    id="canvas"></div>
</template>

<script setup lang="ts">
  import P5 from 'p5';
  import { onMounted, ref } from 'vue';
  import { get, useElementHover } from '@vueuse/core';

  const canvas = ref<HTMLDivElement | null>();
  const numStars = 800;
  const speed = ref(5);

  class Star {
    p: P5;
    x: number;
    y: number;
    z: number;

    constructor(p: P5) {
      this.p = p;
      this.x = p.random(-p.width, p.width);
      this.y = p.random(-p.height, p.height);
      this.z = p.random(p.width); // Depth of the star
    }

    update() {
      this.z -= get(speed);

      if (this.z < 1) {
        // Reset if it's too close
        this.z = this.p.width;
        this.x = this.p.random(-this.p.width, this.p.width);
        this.y = this.p.random(-this.p.height, this.p.height);
      }
    }

    show() {
      this.p.fill(255);
      this.p.noStroke();

      // Perspective scaling
      const sx = this.p.map(this.x / this.z, 0, 1, 0, this.p.width);
      const sy = this.p.map(this.y / this.z, 0, 1, 0, this.p.height);

      // Draw a simple circle for the star
      this.p.ellipse(sx, sy, 8, 8);
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
            star.update();
            star.show();
          });
        };
      };
    }, document.getElementById('canvas') as HTMLDivElement);
  });
</script>
