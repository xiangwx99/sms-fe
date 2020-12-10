<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name: 'App',

  data() {
    return {
      scroll: {}
    }
  },

  props: {
    wrapHeight: {
      type: String,
      default: 'calc(100vh -140px)'
    },
/*
    * 1 滚动的时候会派发scroll事件，会截流。
    * 2 滚动的时候实时派发scroll事件，不会截流。
    * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
*/
    probeType: {
      type: Number,
      default: 0
    },

    // 点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true
    },

    // 是否点击监听鼠标滚动
    mouseWheel: {
      type: Boolean,
      default: true
    },

    // 是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false
    },

    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },

    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false
    },

    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },

    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },

    // 当数据更新后，刷新scroll的延时。
    refreshDelay: {
      type: Number,
      default: 20
    }
  },

  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this.__initScroll()
    }, 20)
  },

  methods: {
    __initScroll() {
      // 1.初始化BScroll对象
      if(!this.$refs.wrapper) return
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        click: this.click,
        mouseWheel: this.mouseWheel,
        probeType: this.probeType,
      })

      // 2.是否触发滚动事件
      if(this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }

      // 3.是否派发滚动到底部事件，用于上拉加载
      if(this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      // 4.是否派发顶部下拉事件，用于下拉刷新
      if(this.pulldown) {
        this.scroll.on('touchend', pos => {
          if(pos.y > 50) {
            this.$emit('pulldown')
          }
        })
      }

      // 5.是否派发列表滚动开始的事件
      if(this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },

    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    }
  },

  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
  .content {
    border: 2px solid green;
    height: 900px;
  }
</style>