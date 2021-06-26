<template>
  <q-card class="limit-width margin" flat>
    <router-link :to="props.link">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{ props.title }}</div>
          <div class="text-caption text-grey">
            {{ props.description }}
          </div>
        </q-card-section>

        <q-card-section class="col-3 flex flex-center">
          <q-card class="pin-top-right shadow-8" :class="`bg-${props.iconBackgroundColor}`">
            <q-avatar class="center q-mt-xs" size="75px" :icon="props.icon" :text-color="props.iconColor" />
          </q-card>
        </q-card-section>
      </q-card-section>
    </router-link>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuCard',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    iconBackgroundColor: {
      type: String,
      required: false,
      default: ''
    },
    iconColor: {
      type: String,
      required: false,
      default: 'white'
    },
    link: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props) {
    return {
      props
    }
  },
})
</script>

<style lang="scss" scoped>
  a {
    color: inherit;
    text-decoration: none;
  }

  .limit-width {
    width: 100%;
    max-width: 350px;
  }
  
  .pin-top-right {
    position: relative;
    right: 2%;
    top: -45%;
  }

  .margin {
    margin-top: 35px;
  }
</style>
