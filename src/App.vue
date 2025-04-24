<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>JS pens by Yaroslav Gromov</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="List Item 1"></v-list-item>
      <v-list-item link title="List Item 2"></v-list-item>
      <v-list-item link title="List Item 3"></v-list-item>
    </v-navigation-drawer>

    <RouterView />
  </v-app>
</template>

<style scoped>

</style>
