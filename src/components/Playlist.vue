<template>
  <div class="playlist-container">
  
  <div class="top-warp">
  <div class="imgs-warp">
  <img :src="playList.coverImgUrl" alt="">
  </div>
  <div class="info-wrap">
  <p class="title">{{playList.name}}</p>
  <div class="author-wrap">
  <img :src="playList.creator.avatarUrl" alt="">
  <span id="autoname">{{playList.creator.nickname}}/</span>
  <span id="creTime">{{playList.createTime}} 创建</span>
  </div>
  <div class="playbutt">
  <el-button type="danger" class="el-icon-video-play" style="color:white" @click="allMusic">播放全部</el-button>
  </div>
   <div class="desc-warp">
   <span class="title">简介:</span>
   <span class="desc">
   {{playList.description}}
   </span>
   </div>
  </div>

  </div>
 <div id="Playlist">
 <el-tabs v-model="activeIndex" class="restul">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlist-table">
  <thead>
  <th style="width:1px;"></th>
  <th style="width:20px;"></th>
  <th style="width:250px;">音乐标题</th>
  <th style="width:200px;">歌手</th>
  <th style="width:300px;">专辑</th>
  <th>时长</th>
  </thead>
  <tbody>
  <tr v-for="(item,index) in playtask" :key="index" class="el-table__row">
  <td>{{index+1}}</td>
  <td>
  <div class="img-warp">
  <img @click="play" :src="item.al.picUrl" alt="">
  <span v-if="show" class="playvido" ><i @click="playMusics(item.id)" class="el-icon-video-play" ></i></span>
  </div>
  </td>
  <td>
  <div class="song-warp">
  <div class="name-warp">
  <span>{{item.name}}</span>
  <i class="el-icon-video-camera"></i>
  </div>
  <span></span>
  </div>
  </td>
  <td>{{item.ar["0"].name}}</td>
  <td>{{item.alia[0]}}</td>
  <td>{{item.dt}}</td>
  </tr>
  </tbody>
  </table>
      </el-tab-pane>
      <el-tab-pane label="评论(666)" name="2">
      <p id="titles">精彩评论({{sayNum}})</p>
       <div class="tosay" v-for="(item,index) in say" :key="index">
       <div class="img-warps">
       <img :src="item.user.avatarUrl" alt="">
       </div>
       <div class="rightsay">
       <span class="contan-warp">{{item.user.nickname}}:</span>
       <span class="contant">{{item.content}}</span>
       <div class="returns" v-if="item.beReplied!=0">
       <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
    查看回复<i class="el-icon-arrow-down el-icon--right"></i>
   </span>
   <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item command="a">{{item.beReplied[0].user.nickname}}:</el-dropdown-item>
      <el-dropdown-item command="b">{{item.beReplied[0].content}}</el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>
       </div>
       <p id="texts">用户ID:{{item.user.userId}}</p>
       </div>
       </div>
       <br>
       <br>
       <br>
       <br>
       <br>
       <p id="titles">最新评论({{total}})</p>
       <div class="tosay" v-for="(item,index) in commentsay" :key="index">
       <div class="img-warps">
       <img :src="item.user.avatarUrl" alt="">
       </div>
       <div class="rightsay">
       <span class="contan-warp">{{item.user.nickname}}:</span>
       <span class="contant">{{item.content}}</span>
       <div class="returns" v-if="item.beReplied!=0">
       <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
    查看回复<i class="el-icon-arrow-down el-icon--right"></i>
   </span>
   <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item command="a">{{item.beReplied[0].user.nickname}}:</el-dropdown-item>
      <el-dropdown-item command="b">{{item.beReplied[0].content}}</el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>
       </div>
       <p id="texts">用户ID:{{item.user.userId}}</p>
       </div>
       </div>
        <div class="pageslist">
      <el-pagination
      @current-change="handelCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="8"
     >
     </el-pagination>
  </div>
      </el-tab-pane>
      <div style="height:120px;"></div>
      </el-tabs>
 </div>
  <div id="audio">
  <audio :src="url" autoplay controls></audio>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
      return {
          activeIndex:'1',
          total:0,
          page:1,
          playList:[],
          playtask:[],
          show:false,
          url:"",
          say:[],
          sayNum:0,
          commentsay:[]
      }
  },
  created(){
    axios({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
        id:this.$route.query.q
        }
      }).then(res => {
        //console.log(res)
        this.playList = res.data.playlist
        this.playtask =res.data.playlist.tracks
        //console.log(res.data.playlist.tracks)
        for(let i=0;i<this.playtask.length;i++){
           //huoquhaomiaoshu
          let dt = this.playtask[i].dt
          let min = parseInt(dt/1000/60)
          if(min<10){
            min='0'+min
          }
          let sec = parseInt(dt/1000%60) 
          if(sec<10){
              sec='0'+sec
          }
          //console.log(min+":"+sec)
          this.playtask[i].dt = `${min}:${sec}`
        }
       }),
       //huoqupinglun
       axios({
        url: "https://autumnfish.cn/comment/hot",
        method: "get",
        params: {
        id:this.$route.query.q,
        type:2
        }
      }).then(res => {
       //console.log(res)
        
        this.say =res.data.hotComments
        this.sayNum = res.data.total
      
       }),
       axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
        id:this.$route.query.q,
        limit:10,
        offset:0
        }
      }).then(res => {
       //console.log(res)
        
        this.total =res.data.total
        this.commentsay = res.data.comments
      
       })

},
methods:{
    play: function() {
      this.show = !this.show;
    },
    allMusic(){
     this.$message.warning('此功能有待开发哦！！！')
    },
    handelCurrentChange(val){
      this.page = val
      axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
        id:this.$route.query.q,
        limit:10,
        offset:(this.page-1)*10
        }
      }).then(res => {
       //console.log(res)
        
        this.total =res.data.total
        this.commentsay = res.data.comments
      
       })

    },
    playMusics(id){
        //console.log(id)
         axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id
        }
      }).then(res => {
        //console.log(res)
        
       //chulishichang
        this.url=res.data.data[0].url
      })
    }
}

}
</script>

<style>
.imgs-warp img{
    width: 150px;
    height: 150px;
    border-radius: 5px;
}
.author-wrap img{
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
.author-wrap span {
    position: absolute;
    margin-left: 20px;
    margin-top: 10px;
  
}
#creTime{
    margin-left: 80px;
}
#autoname{
    width:70px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.imgs-warp {
    margin-left: 200px;
    margin-top: 50px;
}

p.title {
    font-size: 25px;
    margin-left: 400px;
    margin-top: -150px;
}
.author-wrap,.desc-warp{
    color: #a5a5a5;
    margin-left: 400px;
}
.restul {
  margin-top: 20px;
  margin-left: 100px;
  width: 1000px;
}

.el-tabs__item.is-active {
  font-size: 20px;
  color: red;
}
.el-tabs__active-bar {
  background-color: red;
}
.playbutt .el-icon-video-play:before {
    /* position: absolute; */
    margin-left: -20px;
    margin-top: -3px;
    font-size: 20px;
    color:white;
}
.el-button--danger {
    color: #FFF;
    background-color: #F56C6C;
    border-color: #F56C6C;
    width: 120px;
    margin-left: 400px;
    margin-top: 20px;
}
.desc-warp {
    width: 700px;
    margin-top: 20px;
}
.el-table .img-warp img {
    position: relative;
    width:100px;
    height:100px;
    
}
img {
  cursor: pointer;
}
.playvido{
    position: absolute;
    margin-left: -65px;
    width: 45px;
    height: 45px;
    border-radius: 25px;
    background: #e6e5e591;
    cursor: pointer;
    margin-top: 30px;
}
img:hover{
  border-bottom: 2px solid red;
  border-top:2px solid red;
  border-left:2px solid red;
  border-right:2px solid red;
}

#Playlist .el-table {
    max-width: 130%;
    width:130%;
    margin-left: 5px;
}
.el-table i.el-icon-video-camera {
    font-size: 20px;
     cursor: pointer;
}
.el-table i.el-icon-video-play {
   
    cursor: pointer;
    margin-left: -225px;
    margin-bottom: -55px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
.el-icon-video-play:before {
    position: absolute;
    margin-left: 235px;
    margin-top: -60px;
    font-size: 25px;
}
#audio{
    position: fixed;
    left: 0;
    height: 60px;
    z-index: 10;
    bottom: 0px;
    width: 100%;
    background: #bebebec2;
}
audio{
  width: 1500px;
  border: 0;
  right:0;
}
#titles{
    font-size:20px;
    position: relative;
}
.img-warps{
    position: absolute;
  
    margin-left: 70px;
}
.img-warps img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
.contan-warp{
    color: rgba(48, 48, 161, 0.774);
}
.rightsay{
    font-size: 18px;
    margin-left: 150px;
}
span.contant {
    color: #a5a5a5;
}
.returns {
    display: flex;
    position: relative;
   /* background: #dcd8d8;*/
    /*height: 50px;*/
    border-radius: 10px;
    text-indent: 1em;
    
}

 .el-table .success-row {
    background: #f0f9eb;
  }

#texts{
    color:#a5a5a5 ;
}
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
 .pageslist .el-pagination {
  margin-top: 0px;
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
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ff4040;
  color: #fff;
}
.pageslist {
    height: 100px;
}
</style>