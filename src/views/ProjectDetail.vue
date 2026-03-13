<script setup>
import { useRoute } from "vue-router";
import { useGtag } from "vue-gtag-next";
import { onMounted, ref } from "vue";
import projects from "@/assets/projects.json";

/* Importamos TODAS las imágenes dentro de fotos */
const allImages = import.meta.glob("../assets/fotos/**/*.{jpg,png,jpeg}", {
  eager: true,
  import: "default",
});

const route = useRoute();
const { event } = useGtag();
const projectId = Number(route.params.id);

/* Buscar proyecto */
const project = projects.find((p) => p.id === projectId);

/* Obtener nombre de carpeta desde image */
const folder = project?.image.split("/")[0];

/* Filtrar imágenes por carpeta */
const galleryImages = Object.entries(allImages)
  .filter(([path]) => path.includes(`/fotos/${folder}/`))
  .map(([, image]) => image);

/* Lightbox */
const selectedImage = ref(null);
const openLightbox = (img) => (selectedImage.value = img);
const closeLightbox = () => (selectedImage.value = null);

/* Analytics: registrar visita al proyecto */
onMounted(() => {
  if (project) {
    event("view_project", {
      project_id: project.id,
      project_name: project.name,
      project_category: project.category,
    });
  }
});
</script>

<template>
  <main class="container" v-if="project">
    <!-- Cabecera del proyecto -->
    <div class="project-header">
      <RouterLink to="/" class="back-btn">
        <span class="material-icons-outlined">arrow_back</span>
        Volver
      </RouterLink>
      <span class="project-category">{{ project.category }}</span>
    </div>

    <h2 class="posts-title">{{ project.name }}</h2>

    <p class="description">{{ project.description }}</p>

    <!-- GALERÍA con lightbox -->
    <section class="gallery">
      <img
        v-for="(img, index) in galleryImages"
        :key="index"
        :src="img"
        :alt="`${project.name} - imagen ${index + 1}`"
        loading="lazy"
        decoding="async"
        class="gallery-img"
        @click="openLightbox(img)"
      />
    </section>

    <!-- Proyecto no encontrado -->
  </main>

  <main class="container not-found" v-else>
    <p>Proyecto no encontrado.</p>
    <RouterLink to="/" class="back-btn">
      <span class="material-icons-outlined">arrow_back</span>
      Volver al inicio
    </RouterLink>
  </main>

  <!-- Lightbox -->
  <Teleport to="body">
    <div v-if="selectedImage" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">
        <span class="material-icons-outlined">close</span>
      </button>
      <img :src="selectedImage" :alt="project?.name" class="lightbox-img" />
    </div>
  </Teleport>
</template>

<style scoped>
/* Cabecera */
.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.back-btn:hover {
  opacity: 1;
}

.project-category {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.5;
}

/* Galería */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.gallery-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
  cursor: zoom-in;
  transition:
    transform 0.2s,
    opacity 0.2s;
}

.gallery-img:hover {
  transform: scale(1.02);
  opacity: 0.9;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(4px);
}

.lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.8;
  padding: 0.25rem;
  transition: opacity 0.2s;
}

.lightbox-close:hover {
  opacity: 1;
}

/* Not found */
.not-found {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 3rem;
}
</style>
