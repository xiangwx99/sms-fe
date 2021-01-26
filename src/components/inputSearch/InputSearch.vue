<template>
<div class="input-search">
  <el-input
    v-model="model"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
  />
  <i class="el-icon-search"></i>
</div>
</template>

<script>
  import { debounce } from 'function/utils'
  export default {
    name: "InputSearch",
    props: {
      placeholder: {
        type: String,
        default: "请输入内容"
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      debounce: {
        type: Number,
        default: 500
      }
    },
    data() {
      return {
        model: null,
        emitInput: null
      }
    },
    watch: {
      model(val) {
        this.emitInput()
      }
    },
    methods: {
      input() {
        this.$emit('input', this.model)
      }
    },
    mounted() {
      this.emitInput = debounce(this.input, this.debounce)
    }
  }
</script>

<style lang="sass">
.input-search
  position: relative
  .el-input__inner
    border-radius: 20px
  i
    position: absolute
    top: 7px
    right: 15px

</style>