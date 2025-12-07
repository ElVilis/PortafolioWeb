<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
    // { id, title, desc, tech, categories (array), img }
  },
  accent: { type: String, default: '#00e6a7' }, // color dinámico
  hidden: { type: Boolean, default: false }     // para filtro/ búsqueda
})

const cardStyle = computed(() => ({
  '--brand': props.accent
}))
</script>

<template>
  <article
    class="card project"
    :id="`project-${project.id}`"
    :style="cardStyle"
    :class="{ 'is-hidden': hidden }"
  >
    <img :src="project.img" :alt="`Portada del proyecto ${project.title}`" loading="lazy" />
    <header><h3>{{ project.title }}</h3></header>
    <p>{{ project.desc }}</p>
    <p class="tags"><strong>Tecnologías:</strong> {{ project.tech }}</p>
    <p class="meta">Categorías: {{ project.categories.join(', ') }}</p>
  </article>
</template>

<style scoped>
.project {
  transition: transform .2s ease, box-shadow .2s ease;
  border: 1px solid var(--border);
}
.project:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 34px rgba(0,0,0,.28);
}
.project header h3 {
  margin: 10px 0 8px;
}

/* 👇 esto es lo importante */
.is-hidden {
  display: none !important;
}
</style>

