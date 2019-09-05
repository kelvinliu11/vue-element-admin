<template>
  <div class="app-container" />
</template>

<script>

export default {
  name: 'MachinePort',
  components: {},
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
