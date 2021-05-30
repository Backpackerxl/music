<template>
  <div class="index">
  <!--left-->
  <div class="navh">
   <el-dropdown>
  <el-button type="primary">
    乐吧导航<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item style="width:100px;">
      <router-link to="/discovery" id="roter">
        <img src="../assets/foudmusic.png" >
        <span id="navtxts">发现音乐</span>
      </router-link>
      </el-dropdown-item>
      <el-dropdown-item>
       <router-link to="/listmusic" id="roter">
       <img src="../assets/listmusic.png">
        <span id="navtxts">推荐歌单</span>
      </router-link>
      </el-dropdown-item>
      <el-dropdown-item>
       <router-link to="/song" id="roter">
       <img src="../assets/newmusic.png">
       <span id="navtxts">最新音乐</span>
     </router-link>
      </el-dropdown-item>
      <el-dropdown-item>
      <router-link to="/mv" id="roter">
        <img src="../assets/mv.png">
        <span id="navtxts">最新MV</span>
      </router-link>
      </el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>
  </div>
  <!--right-->
  <div class="main">
  <router-view/>
  </div>
  </div>
</template>

<script>

export default {
  name: 'Midole',
  components:{
    
  },
  methods:{
  },
  data(){
    return{
      scoreheight:0
    }
},
   

};
</script>

<style>
.index {
  display: flex;
  /*height: 1800px;*/
}
.index .el-menu-vertical-demo{
  width: 200px;
  /*height: 1800px;*/
  background-color: #ededed;
}
.main {
  position: relative;
  flex: 1;
}

.el-menu-item {
  font-size: 20px;
}
.el-button--primary {
    color: #FFF;
    background-color: #e81d1dc2;
    border-color: #e81d1dc2;
    margin-top: 50px;
    margin-left: 10px;
}
#navtxts{
  color: #e81d1dc2;
}
#roter{
    text-decoration: none;
}
#roter img{
    width: 20%; 
    margin-left: 10px;
}
</style>