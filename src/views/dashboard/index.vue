<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { testInit } from '@/api/initTest'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const params = {
        name: '小明',
        age: 25,
        city: '六安'
      }
      testInit(params)
        .then(response => {
          debugger
          console.log(response.data)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
