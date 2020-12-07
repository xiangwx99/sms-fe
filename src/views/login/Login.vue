<template>
  <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      phoneNumber: null,
      password: null
    }
  },

}
</script>

<style lang="sass" scoped>
.box-card
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 30%
</style>>
