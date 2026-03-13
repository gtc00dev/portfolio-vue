<script setup>
import projects from "@/assets/projects.json";

const images = import.meta.glob("../assets/fotos/**/*", {
  eager: true,
  import: "default",
});

const getImage = (imagePath) => {
  return images[`../assets/fotos/${imagePath}`];
};
</script>

<template>
  <main class="container">
    <h2 class="posts-title">Proyectos destacados</h2>

    <section class="inspo">
      <article v-for="project in projects" :key="project.id" class="inspo-item">
        <img :src="getImage(project.image)" :alt="project.name" />

        <h3>{{ project.name }}</h3>

        <p class="date"><span>Industria:</span> {{ project.category }}</p>

        <p class="description">
          {{ project.description }}
        </p>

        <RouterLink :to="`/project/${project.id}`" class="project-btn">
          Ver proyecto
        </RouterLink>
      </article>
    </section>
  </main>
</template>
