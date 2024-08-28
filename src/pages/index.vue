<template>
  <main class="font-mono">
    <p
      id="heading"
      class="common-padding text-sm">
      <span
        v-for="(word, index) in displayWords"
        :key="index"
        class="block">
        {{ word }}
      </span>
    </p>

    <div class="gap-y-2 flex flex-wrap justify-between">
      <router-link
        :to="p.urlName"
        v-for="p in projects"
        :key="p.id"
        class="border border-transparent hover:border-slate-500 transition- duration-500 ease-in-out size-[300px] text-center content-center">
        <video
          v-if="p.isVideo"
          class="size-full object-cover"
          :src="p.src"
          autoplay="true"
          loop
          muted />
        <img
          v-else
          class="size-full object-cover"
          :src="p.src" />
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import projects from '../projects';

  const words = [
    'Hetari',
    '100 Day Project:',
    'An',
    'Exploration of',
    'DESIGN, COMPFORM, and NEW THINGS',
    'start at',
    '- August 28 2024',
    '& end',
    '- until I die'
  ];
  const chars =
    'abcdeghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+{}[]|\\;:"<>?,./`~';

  const displayWords = ref(words.map(() => ''));
  function randomChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  onMounted(() => {
    let duration = 1000; // 1 second
    let interval = 10; // Update every 50ms
    let steps = duration / interval;

    let stepCount = 0;
    const intervalId = setInterval(() => {
      stepCount++;

      displayWords.value = words.map((word) => {
        if (stepCount >= steps) {
          return word;
        }
        return word
          .split('')
          .map((char, j) =>
            stepCount >= (steps / word.length) * (j + 1) ? char : randomChar()
          )
          .join('');
      });

      if (stepCount >= steps) {
        clearInterval(intervalId);
      }
    }, interval);
  });
</script>
