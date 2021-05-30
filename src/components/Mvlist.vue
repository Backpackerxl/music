<template>
<div class="mv-container">
  <div class="mv-warp">
  <h3 class="title">MV 详情</h3>
  <div class="vido-warp">
  <video :src="url" controls></video>
  </div>
  <h3 class="titles">推荐MV</h3>
  <div class="tui-warp">
   <div class="listmv">
      <div class="litems">
        <div class="litem" v-for="(item, index) in simimv" :key="index">
          <div class="limg-warp">
            <img @click="black" :src="item.cover" />
             <span v-if="show" class="playvido" ><i class="el-icon-video-play" @click="toMv(item.id)"></i></span>
            <span class="liconfont licon-play"> </span>
            <div class="lnum-warp">
              <div class="liconfont licon-play" v-if="show">
                <i class="el-icon-view"></i>
                <div class="lnum">{{item.playCount}}</div>
                <div class="time">{{item.duration}}</div>
              </div>
            </div>
            <div class="linfo-warp">
              <!--geming-->
              <div class="lname">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h3 id="titlest">MV信息</h3>
  <div id="final">
  <div id="desctext">
  <div class="txtdes">
  <span class="mvnames">歌名：{{mvtxt.name}}</span>
  <br>
  <span class="siger">歌手：{{mvtxt.artistName}}</span>
  <br>
  <span class="cretime">发布时间：{{mvtxt.publishTime}}</span>
  </div>
  <div class="descrs">
  <span class="smalti">{{mvtxt.briefDesc}}</span>
  <br>
  <br>
  <span class="desa">简介：{{mvtxt.desc}}</span>
  </div>
  </div>
  </div>
 <div id="saymv">
 <p id="titlese">最新评论({{total}})</p>
       <div class="tosay" v-for="(item,index) in commentsay" :key="index">
       <div class="img-warps">
       <img :src="item.user.avatarUrl" alt="">
       </div>
       <div class="rightsays">
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
 </div>
   
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
export default {
    data(){
     return{
         total:20,
         page:1,
         limit:10,
         url:"",
         simimv:[],
         show:false,
         mvtxt:[],
        commentsay:[]

     }
    },
    methods:{
      black: function() {
      this.show = !this.show;
    },
    toMv(id){
        axios({
           url:"https://autumnfish.cn/mv/url",
           method: 'get',
           params: {
               id
           }
       }).then(res => {
          this.url=res.data.data.url
          //console.log(res)
       })
    },
    handelCurrentChange(val){
      this.page = val
      axios({
        url: "https://autumnfish.cn/comment/mv",
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
    }
    },
  created(){
      //mvplay
       axios({
           url:"https://autumnfish.cn/mv/url",
           method: 'get',
           params: {
               id:this.$route.query.q
           }
       }).then(res => {
          this.url=res.data.data.url
          //console.log(res)
       }),
       axios({
           url:"https://autumnfish.cn/mv/detail",
           method: 'get',
           params: {
               mvid:this.$route.query.q
           }
       }).then(res => {
          this.mvtxt=res.data.data
          //console.log(res)
       }),
       axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
        id:this.$route.query.q,
        limit:10,
        offset:0
        }
      }).then(res => {
       console.log(res)
        
        this.total =res.data.total
        this.commentsay = res.data.comments
      
       }),
       axios({
           url:"https://autumnfish.cn/simi/mv",
           method: 'get',
           params: {
               mvid:this.$route.query.q
           }
       }).then(res => {
          this.simimv=res.data.mvs
          //console.log(res)
           for(let i=0;i<this.simimv.length;i++){
            let duration = this.simimv[i].duration
          let min = parseInt(duration/1000/60)
          if(min<10){
            min='0'+min
          }
          let sec = parseInt(duration/1000%60) 
          if(sec<10){
              sec='0'+sec
          }
          //console.log(min+":"+sec)
          this.simimv[i].duration = `${min}:${sec}`
           if(this.simimv[i].playCount>100000){
                this.simimv[i].playCount=parseInt(this.simimv[i].playCount/10000)+"万"
           }
         }
       })
       
  }
}
</script>

<style>
.mv-warp{
    width: 1000px;
    margin: 0 auto;
}
h3.title{
    margin-left: 120px;
}
.vido-warp video {
    width: 700px;
    height: 500px;
    margin-left: 120px;
    margin-top: -65px;
}
h3.titles {
    margin-top: -440px;
    margin-left: 850px;
}
.tui-warp .linfo-warp .lname {
    /* bottom: -5px; */
    font-size: 16px;
    width: 200px;
    margin-left: 230px;
    margin-top: -150px;
    color:#a5a5a5;
}
.tui-warp .singer {
    margin-left: 230px;
    font-size: 16px;
    width: 200px;
    color:#a5a5a5;
}
.tui-warp .listmv {
    /* top: 1395px; */
    margin-top: -70px;
    margin-left: 40px;
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
.tui-warp{
   /* position: relative;*/
    width: 250px;
}
.tui-warp .listmv h3 {
  margin-left: 25px;
}
.tui-warp .time {
    position: absolute;
    top: 0px;
    right: 40px;
    color: rgb(255 255 255);
}
.tui-warp .listmv .lnum .lname {
  position: absolute;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.tui-warp .listmv .litems {
    width: 100px;
}
.tui-warp .linfo-warp {
    margin-left: 16px;
}
.tui-warp .listmv .litems .litem {
  position: relative;
  height: 180px;
  border-radius: 5px;
  margin-top: 60px;
  margin-left: 800px;
  float: left;
}
.limg-warp img {
  position: relative;
  width: 200px;
  height: 180px;
  border-radius: 5px;
  margin-left: 20px;
}
.playvido {
    position: absolute;
    width: 45px;
    height: 45px;
    border-radius: 25px;
    background: #e6e5e591;
    cursor: pointer;
    margin-left: -120px;
    margin-top: 80px;
}
.el-icon-video-play:before {
    position: absolute;
    margin-left: 10px;
    margin-top: -10px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
#saymv {
    position: absolute;
    top: 750px;
}
#titlest{
    position: absolute;
    margin-left: 120px;
    top: 500px;

}
div#desctext {
    margin-left: 120px;
    color: #a5a5a5;
}
div.descrs {
    width: 550px;
}
div#final {
    position: absolute;
    top: 560px;
}
#titlese{
    font-size:20px;
    margin-left: 90px;
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
.rightsays{
    font-size: 18px;
    width: 600px;
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