<template>
  <RandomArtwork />
</template>

<script>
// @ is an alias to /src
import RandomArtwork from "@/components/RandomArtwork.vue";

export default {
  name: "Home",
  metaInfo: {
    title: "MET Gallery",
  },
  components: {
    RandomArtwork,
  },
};
</script>
