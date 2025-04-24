<script setup lang="ts">
const drawer = defineModel('drawer');
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>JS pens by Yaroslav Gromov</v-toolbar-title>
  </v-app-bar>
</template>
