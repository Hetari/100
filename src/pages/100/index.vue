<template>
  <main class="font-mono">
    <p id="heading" class="common-padding text-[1rem]]">
      <span v-for="(word, index) in displayWords" :key="index" class="block">
        {{ word }}
      </span>
    </p>

    <div class="flex flex-wrap gap-y-2">
      <router-link
        :to="p.urlName"
        v-for="p in projects"
        :key="p.id"
        class="z-0 size-[100vw] content-center border transition-all duration-500 ease-in-out hover:z-10 hover:scale-105 hover:shadow-2xl hover:drop-shadow-2xl md:size-[25vw] lg:size-[20vw]"
      >
        <video
          v-if="p.isVideo"
          class="size-full object-cover"
          :src="p.src"
          autoplay
          loop
          muted
          playsinline
        />
        <img v-else class="size-full object-cover" :src="p.src" />
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import projects from '../../projects';

  const words = [
    'Hetari',
    '100 Day Project:',
    'An',
    'Exploration of',
    'DESIGN, COMPFORM, and NEW THINGS',
    'start at',
    '- August 28 2024',
    '& end',
    '- until I die',
  ];
  const chars =
    'abcdeghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+{}[]|\\;:"<>?,./`~';

  const displayWords = ref(words.map(() => ''));
  function randomChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  onBeforeMount(() => {
    displayWords.value = words.map((word) => {
      return word
        .split('')
        .map(() => randomChar())
        .join('');
    });
  });

  onMounted(() => {
    let duration = 1250; // in ms
    let interval = 10; // in ms
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
            stepCount >= (steps / word.length) * (j + 1) ? char : randomChar(),
          )
          .join('');
      });

      if (stepCount >= steps) {
        clearInterval(intervalId);
      }
    }, interval);
  });
</script>
