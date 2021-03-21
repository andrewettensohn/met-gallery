<template>
  <div class="about">
    <v-row class="text-center">
      <v-col>
        <h3>MET Gallery</h3>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <p>App by Andrew Ettensohn using Vue Js. and Vuetify.</p>
        <p>
          Images provided by the
          <a href="https://www.metmuseum.org/"
            >The Metropolitan Museum of Art.</a
          >
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "About",
  metaInfo: {
    title: "MET Gallery",
  },
};
</script>