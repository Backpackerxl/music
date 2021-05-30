<template>
  <div class="index">
     <!--lunbotu-->
     <div>
      <el-carousel :interval="4000" type="card" height="200px" class="lbt">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
      <img :src="item.imageUrl" class="rounded">
      </el-carousel-item>
      </el-carousel>
     </div>
    <!--tuijiangedan-->
    <div class="box">
      <h3 class="title">推荐歌单</h3>
       <div class="items">
       <div class="item" v-for="(item,index) in list" :key='index'>
       <div class="img-warp">
       <div class="desc-warp">
       <span class="desc">
       </span>
       </div>
       <img :src="item.picUrl" alt="" @click="play" >
       <span v-if="show" class="playvidoe" ><i class="el-icon-video-play"  @click="toPlayList(item.id)" ></i></span>
       </div>
        <p class="name">{{item.name}}</p>
       </div>
       </div>
    </div>
     <!--tuijianyinyue-->
     <div class="boxer">
     <h3 class="title">最新音乐</h3>
     <div id="items">
     <div id="item" v-for="(item,index) in newmusic" :key="index">
     <div class="left1" @click="play">
     <img @click="play" :src="item.picUrl" id="newmusic">
      <span v-if="show" class="playvidos" ><i class="el-icon-video-play"  @click="playMusic(item.id)" ></i></span>
     </div>
     <div class="right1">
      <h6>{{item.name}}</h6>
      <p>{{item.song.artists[0].name}}</p>
     </div>
     </div>
    </div>
     </div>
     
    <!--mvtuijian-->
    
     <div id="foomv">
     <h3>推荐MV</h3>
     <div class="items">
     <div class="item" v-for="(item,index) in mvs" :key="index">
     <div class="img-warp">
     <img :src="item.picUrl" @click="play">
     <span v-if="show" class="playvidoe" ><i class="el-icon-video-play"  @click="toMv(item.id)" ></i></span>
     
     <div class="num-warp">
     <div class="iconfont icon-play">
     <i class="el-icon-view"></i>
     <div class="num">{{item.playCount}}</div>
     </div>
     </div>
     <div class="info-warp">
     <!--geming-->
     <div class="name">{{item.name}}</div>
      <!--gesouming-->
     <div class="singer">{{item.artistName}}</div>
      <div style="height:120px;"></div>
     </div>
     </div>
     </div>
     </div>
     
     </div>
 <div id="audio">
  <audio :src="url" autoplay controls></audio>
  </div>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  
   name: 'Discovrey',
   
   data(){
       var musicUrl=""
       return {
           banners: [],
           list:[],
           newmusic :[],
           url:"",
           mvs: [],
           show:false
       }
   },
   created() {

       //console.log('created')
       axios({
           url:"https://autumnfish.cn/banner",
           method: 'get',
           params :{}
       }).then(res => {
           //console.log(res)
           this.banners = res.data.banners

       }),
       axios({
           url:"https://autumnfish.cn/personalized",
           method: 'get',
           params :{
               //huoqushujuliang
               limit:6
           }
       }).then(res => {
          // console.log(res)
           this.list = res.data.result

       }),
        axios({
           url:"https://autumnfish.cn/personalized/newsong",
           method: 'get',
       }).then(res => {
           //console.log(res)
           this.newmusic = res.data.result

       }),
       axios({
           url:"https://autumnfish.cn/personalized/mv",
           method: 'get',
       }).then(res => {
           //console.log(res)
           this.mvs = res.data.result
         for (let i =0;i<this.mvs.length;i++){
          if(this.mvs[i].playCount>100000){
            this.mvs[i].playCount = parseInt(this.mvs[i].playCount/10000)+'万'
          }
        }
       })
   },
  methods: {
      play: function() {
      this.show = !this.show;
    },
    toPlayList(id){
      this.$router.push(`/playlist?q=${id}`)
     },
     toMv(id){
      this.$router.push(`/mvlist?q=${id}`)
     },
      playMusic(id){
        //console.log(id)
        axios({
           url:"https://autumnfish.cn/song/url",
           method: 'get',
           params: {
               id
           }
       }).then(res => {
          this.url=res.data.data[0].url
          //console.log(res)
       })
      }

  },
}
</script>

<style>
.index{
    position: relative;
    width: 1000px;
    height: 1470px;
}
.lbt{
   position: absolute;
   top: 20px;
   margin-left: 200px;
   width: 800px;
}
.rounded{
    width: 550px;
    height: 230px;
}
.box{
    position: absolute;
    top: 250px;
    margin-left: 200px;
}
.items {
    width: 700px;
}
.item {
    width: 200px;
    height: 230px;
    margin-left: 30px;
    float: left;

}
.box img{
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 5px;
   
}
.name{
    position: absolute;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 0;
    }
  .item p{
    width: 200px;
    margin-left: 0;
    float: left;
    }
.desc-warp{
    width: 700px;
}
.boxer{
    position: absolute;
    top: 800px;
    margin-left: 200px;

}
#items {
    width: 700px;
}
#item {
    position: relative;
    width: 300px;
    height: 230px;
    margin-left: 50px;
    margin-top: -5px;
    margin-bottom: -120px;
    float: left;

}
#newmusic {
    height: 80px;
    border-radius: 5px;
}
.left1:hover{
    background: rgba(214, 214, 214, 0.924);
}
.right1 {
    position: absolute;
    display: flex;
    top: -10px;
    left:120px;
}
.right1 p{
    position: absolute;
    white-space: nowrap;
    margin-top: 50px;
    margin-left: 0px;
    color: rgba(105, 105, 102, 0.794);
}
.right1 h6{
    white-space: nowrap;
    margin-top: 15px;
    font-size: 18px;
    font-weight: 400;
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
#foomv{
    position: absolute;
    top:1400px;
    margin-left: 140px;
}
#foomv h3{
    margin-left: 25px;
}
#foomv .num .name .singer{
    position: absolute;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
   
}
#foomv .items{
    width: 930px;
}
#foomv .items .item{
    position: relative;
    height: 180px;
    border-radius: 5px;
}
#foomv i.el-icon-view {
    position: absolute;
    margin-left: 120px;
    top: 5px;
    background: white;
    font-size: 20px;
    border-radius: 10px;
    height: 20px;
    width: 20px;
}
#foomv .num{
    position: absolute;
    top:5px;
    left: 140px;
    color: white;
}
.info-warp .name{
    position: absolute;
    bottom: -30px;
    font-size: 16px;
     width: 200px;
    
}
.img-warp img{
    width: 200px;
    height: 180px;
    border-radius: 5px;
}
.info-warp .singer{
    position: absolute;
    bottom: -50px;
    font-size: 14px;
    width: 200px;
     color: rgba(105, 105, 102, 0.794);
}
.playvidos {
    position: absolute;
    margin-left: -55px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: #e6e5e591;
    cursor: pointer;
    margin-top: 25px;
}

.playvidos .el-icon-video-play:before {
    position: absolute;
    margin-left: 5px;
    margin-top: -10px;
    font-size: 18px;
    color: red;
    font-weight: 700;
}
.playvidoe {
    position: absolute;
    display: flex;
    margin-left: 70px;
    width: 45px;
    height: 45px;
    border-radius: 25px;
    background: #e6e5e591;
    cursor: pointer;
    margin-top: -115px;
}
.playvidoe .el-icon-video-play:before {
    margin-left: 0px;
    margin-top: -10px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
.playvidoe i.el-icon-video-play {
    cursor: pointer;
    margin-left: 10px;
    /* margin-bottom: 10px; */
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
</style>