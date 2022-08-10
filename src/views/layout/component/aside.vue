<template>
  <div class="aside">
    <el-menu
        router
        class="el-menu-vertical-demo">
        <div v-for="item in routerList">
          <div v-if="!item.hidden">
            <template v-for="childRoute in item.children">
              <template v-if="childRoute.children">
                <el-submenu :index="childRoute.path" v-if="!childRoute.hidden">
                  <template slot="title">
                    <span>{{ childRoute.meta.title }}</span>
                  </template>
                  <template v-for="route in childRoute.children">
                    <el-menu-item :index="route.path">{{ route.meta.title }}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="childRoute.path">
                  <span slot="title">{{ childRoute.meta.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </div>
        </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",

  data() {
    return {
      routerList: []
    }
  },

  mounted() {
    this.routerList = this.$router.options.routes;
  }
}
</script>

<style scoped>

</style>