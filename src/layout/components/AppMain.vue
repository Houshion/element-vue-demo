<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
        <!-- <router-view /> -->
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    // key: {
    //   get(val) {
    //     console.log('get', val)
    //     return this.$route.path
    //   },
    //   set(val) {
    //     console.log('setter', val)
    //     return val
    //   }
    // }
  },
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.key = this.$route.path
    }
  },
  data() {
    return {
      key: this.$route.path
    }
  },
  mounted() {
    this.$root.Bus.$on("test", res => {
      console.log("bus", res, 123123132)
      this.key = res
    })
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
  top: 134px;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 134px);
  }

  .fixed-header + .app-main {
    padding-top: 134px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.el-tabs__header {
  margin: 0;
  background: #ffffff;
}
</style>
