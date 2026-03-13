<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="main-header">
    <!-- Logo clickeable -->
    <RouterLink to="/" class="brand">
      <h1 class="logo">Valentina Noir</h1>
      <p class="tagline">Portafolio Profesional de Fotografía</p>
    </RouterLink>

    <!-- Icono mail -->
    <div class="header-actions">
      <span class="material-icons-outlined mail-icon"> mail </span>
    </div>
  </header>
</template>
