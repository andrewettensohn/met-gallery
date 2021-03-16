<template>
  <div class="browse">
    <Gallery />
  </div>
</template>

<script>
// @ is an alias to /src
import Gallery from "@/components/Gallery.vue";

export default {
  name: "Browse",
  metaInfo: {
    title: "MET Gallery",
  },
  components: {
    Gallery,
  },
};
</script>