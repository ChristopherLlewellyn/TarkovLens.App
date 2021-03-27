<template>
  <div class="fullscreen bg-dark text-primary text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        unelevated
        outline
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeta } from 'quasar'
import { App } from 'src/enums/app'

const metaData = {
  title: '404',
  titleTemplate: (title: string) => `${title} - ${App.AppName}`,
}

export default defineComponent({
  name: 'Error404',
  setup() {
    useMeta(metaData)
  }
})
</script>
