<template>
  <h2>params: {{route.params}}</h2>
  <h2>query: {{route.query}}</h2>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style lang="" scoped>

</style>