<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

import NavigationDrawer from '@/components/NavigationDrawer.vue'
import AppBar from '@/components/AppBar.vue'

const drawer = ref(false)
</script>

<template>
  <v-app>
    <AppBar v-model:drawer="drawer" />
    <NavigationDrawer v-model="drawer" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
