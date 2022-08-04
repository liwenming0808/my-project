<template>
  <div class="layout">
    <el-container style="height: 100%">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <Sidebar></Sidebar>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "./component/aside";

export default {
  name: "layout",
  components: {
    Sidebar
  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
  .el-header {
    background-color: #232323;
    padding: 0;
  }
  .el-aside {
    //background-color: rgb(61, 61, 61);
    height: 100%;
  }
}
</style>
