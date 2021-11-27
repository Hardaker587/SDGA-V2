<template>
  <button class="btn btn-primary" @click="add">Add</button>
</template>

<script lang="ts">
export default {
  methods: {
    add() {
      this.$database().addOne({
        collection: 'test',
        reference: 'test2',
        data: 'test',
      })
    },
  },
}
</script>
