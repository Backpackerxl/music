<template>
  <div class="main">
    <div class="playlist-conter">
      <el-container>
        <el-aside width="200px">
          <img :src="toplist.coverImgUrl" alt=""/>
          </el-aside>
        <el-main>
          <el-button type="warning" plain @click="playList">精品歌单</el-button>
          <div class="title">
            {{ toplist.name }}
          </div>
          <div class="info">
            {{ toplist.description }}
          </div>
        </el-main>
      </el-container>
    </div>
    <div class="listmv">
      <div class="litems">
        <div class="litem" v-for="(item, index) in list" :key="index">
          <div class="limg-warp">
            <img @click="black" :src="item.coverImgUrl" />
             <span v-if="show" class="playvidoes" ><i class="el-icon-video-play"  @click="toPlayList(item.id)" ></i></span>
        
            <div class="lnum-warp">
              <div class="liconfont licon-play" v-if="show">
                <i class="el-icon-view"></i>
                <div class="lnum">{{ item.playCount }}</div>
              </div>
            </div>
            <div class="linfo-warp">
              <!--geming-->
              <div class="lname">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-pagination
    @current-change="handelCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="8"
    >
    </el-pagination>
    <div class="song">
      <span
        class="item"
        :class="{ active: tag == '全部' }"
        @click="tag = '全部'"
        >全部</span
      >
      <span
        class="item"
        :class="{ active: tag == '欧美' }"
        @click="tag = '欧美'"
        >欧美</span
      >
      <span
        class="item"
        :class="{ active: tag == '华语' }"
        @click="tag = '华语'"
        >华语</span
      >
      <span
        class="item"
        :class="{ active: tag == '流行' }"
        @click="tag = '流行'"
        >流行</span
      >
      <span
        class="item"
        :class="{ active: tag == '说唱' }"
        @click="tag = '说唱'"
        >说唱</span
      >
      <span
        class="item"
        :class="{ active: tag == '摇滚' }"
        @click="tag = '摇滚'"
        >摇滚</span
      >
      <span
        class="item"
        :class="{ active: tag == '民谣' }"
        @click="tag = '民谣'"
        >民谣</span
      >
      <span
        class="item"
        :class="{ active: tag == '电子' }"
        @click="tag = '电子'"
        >电子</span
      >
      <span
        class="item"
        :class="{ active: tag == '轻音乐' }"
        @click="tag = '轻音乐'"
        >轻音乐</span
      >
      <span
        class="item"
        :class="{ active: tag == '影视原声' }"
        @click="tag = '影视原声'"
        >影视原声</span
      >
      <span class="item" :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'"
        >ACG</span
      >
      <span
        class="item"
        :class="{ active: tag == '怀旧' }"
        @click="tag = '怀旧'"
        >怀旧</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      total: 0,
      activeName: "second",
      page: 1,
      toplist: {},
      list: [],
      show: false,
      tag: "全部",
    };
  },
  watch: {
    tag() {
      //console.log(this.tag)
      //tobuliebiao
      this.topData();
      //gedanliebiao
      this.listData();
      //xiougaiyemaweiyi
      this.page=1
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    playList(){
     this.$message.warning('此功能有待开发哦！！！')
    },
    black: function() {
      this.show = !this.show;
    },
     toPlayList(id){
      this.$router.push(`/playlist?q=${id}`)
     },
    topData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.tag
        }
      }).then(res => {
        //console.log(res)
        this.toplist = res.data.playlists[0];

      });
    },
    listData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 8,
          // qishizhi (yema-1)*dangyeshuju
          offset: (this.page-1)*8,
          cat: this.tag
        }
      }).then(res => {
        //console.log(res)
        this.total=res.data.total
        this.list = res.data.playlists;
        for(let i=0;i<this.list.length;i++){
           if(this.list[i].playCount>100000){
                this.list[i].playCount=parseInt(this.list[i].playCount/10000)+"万"
           }
         }
      });
    },
    //yemagaibianchansu
    handelCurrentChange(val){
        //console.log(`当前页: ${val}`)
        //chunshuju
        this.page = val
        //congxinghuoqushuju
        this.listData()

    }
  },
  created() {
    this.topData();
    this.listData();
  }
};
</script>

<style>

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ff4040;
  color: #fff;
}
.playlist-conter img {
  height: 120px;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 10px;
}
.el-main {
  position: relative;
  margin-left: -70px;
}
.el-container {
  margin-left: 160px;
  background: rgb(186, 118, 241);
  width: 930px;
  border-radius: 5px;
  margin-top: 100px;
  color: white;
  font-size: 20px;
}
.el-container .info {
  color: rgb(235, 216, 109);
  font-size: 15px;
}
#element.style {
  width: 140px;
}
.song {
  position: absolute;
  margin-left: 130px;
  margin-top: -650px;
}

.song .item {
  /* width: 200px; */
  /* height: 230px; */
  margin-right: -10px;
  float: left;
  margin-top: -20px;
  font-size: 16px;
  width: 80px;
  height: 50px;
  color: rgb(113, 122, 129);
  cursor: pointer;
}
.song .item.active {
  color: #ff4040;
  font-size: 18px;
}
.el-tabs__item.is-active {
  font-size: 20px;
  color: red;
}
.el-tabs__active-bar {
  background-color: red;
}
.listmv {
  top: 1400px;
  margin-left: 140px;
}
.listmv h3 {
  margin-left: 25px;
}
.listmv .lnum .lname {
  position: absolute;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.listmv .litems {
  width: 930px;
}
.listmv .litems .litem {
  position: relative;
  height: 180px;
  border-radius: 5px;
  margin-top: 100px;
  float: left;
}
.main i.el-icon-view {
  position: absolute;
  margin-left: 20px;
  top: 0px;
  background: rgba(124, 123, 123, 0.781);
  font-size: 20px;
  /* border-radius: 10px; */
  width: 30px;
  height: 40px;
}
.lnum {
  position: absolute;
  top: 0px;
  left: 50px;
  color: white;
  background: rgba(124, 123, 123, 0.781);
  width: 170px;
  height: 40px;
}
.limg-warp img {
  position: relative;
  width: 200px;
  height: 180px;
  border-radius: 5px;
  margin-left: 20px;
}
.linfo-warp .lname {
  bottom: -5px;
  font-size: 16px;
  width: 200px;
  margin-left: 20px;
}

.linfo-warp {
  position: relative;
  bottom: 0px;
  font-size: 20px;
  width: 230px;
  color: rgba(105, 105, 102, 0.794);
}
.el-pagination {
  margin-top: 650px;
  margin-left: 300px;
}
.el-pagination .btn-prev .el-icon .el-pagination .btn-next .el-icon {
  font-size: 20px;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  min-width: 40px;
  height: 40px;
  font-size: 20px;
}
.playvidoes {
    position: absolute;
    display: flex;
    margin-left: 95px;
    width: 45px;
    height: 45px;
    border-radius: 25px;
    background: #e6e5e591;
    cursor: pointer;
    margin-top: -115px;
}
.playvidoes .el-icon-video-play:before {
    margin-left: 0px;
    margin-top: -10px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
.playvidoes i.el-icon-video-play {
    cursor: pointer;
    margin-left: 10px;
    /* margin-bottom: 10px; */
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
</style>