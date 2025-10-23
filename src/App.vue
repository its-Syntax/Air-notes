<script setup>
import AirNotes from './components/AirNotes.vue'
const VERSION = __APP_VERSION__
</script>

<template>
  <AirNotes />
  <footer class="credits">
    <span>Air Notes - for virtual pilots</span>
    <span class="version">v{{ VERSION }}</span>
  </footer>
</template>

<style scoped>
.credits {
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.6;
  margin: 2rem 0 1rem;
}
.credits .version { margin-left: .5rem; opacity: .9; color: #ffb400; }
</style>
