<template>
  <div class="about my-1">
    <v-container>
      <v-row class="text-center mb-3">
        <v-col>
          <h3>MET Gallery</h3>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col class="px-3">
          <p>App by Andrew Ettensohn using Vue Js. and Vuetify. Images provided by
            <a href="https://www.metmuseum.org/"
              >The Metropolitan Museum of Art.</a
            ></p>
        </v-col>
      </v-row>        
    </v-container>
    <RandomArtwork />
  </div>
</template>

<script>
import RandomArtwork from "@/components/RandomArtwork.vue";
export default {
  name: "About",
  metaInfo: {
    title: "MET Gallery",
  },
    components: {
    RandomArtwork,
  },
};
</script>