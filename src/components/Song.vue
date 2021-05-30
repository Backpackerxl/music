<template>
  <div>
  <div class="top-bar">
   <span
        class="item"
        :class="{ active: tag == '0' }"
        @click="tag = '0'"
        >全部</span
      >
       <span
        class="item"
        :class="{ active: tag == '7' }"
        @click="tag = '7'"
        >华语</span
      >
      <span
        class="item"
        :class="{ active: tag == '96' }"
        @click="tag = '96'"
        >欧美</span
      >
     
      <span
        class="item"
        :class="{ active: tag == '8' }"
        @click="tag = '8'"
        >日本</span
      >
      <span
        class="item"
        :class="{ active: tag == '16' }"
        @click="tag = '16'"
        >韩国</span
      >
  </div>
  <!--dibutablele-->
  <table class="el-table playlist-table">
  <thead>
  <th></th>
  <th></th>
  <th>音乐标题</th>
  <th>歌手</th>
  <th>专辑</th>
  <th>时长</th>
  </thead>
  <tbody>
  <tr v-for="(item,index) in list" :key="index" class="el-table__row">
  <td>{{index+1}}</td>
  <td>
  <div class="img-warp">
  <img @click="play" :src="item.album.picUrl" alt="">
  <span @click="playMusics(item.id)" v-if="show" class="playvido" ><i class="el-icon-video-play" ></i></span>
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
  <td>{{item.album.artists["0"].name}}</td>
  <td>{{item.album.name}}</td>
  <td>{{item.duration}}</td>
  </tr>
  </tbody>
  <div style="height:120px;"></div>
  </table>
  <div id="audio">
  <audio :src="url" autoplay controls></audio>
  </div>
  
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name :'Song',
    components:{
        
    },
 data(){
     return{
      list:[],
      tag: "0",
      url:"",
      show:false
     }
 },
 watch:{
   tag(){
     this.getList()
   }
 },
    created(){
     this.getList()
    },
    methods:{
      //huoquliebiaoshuju
      getList(){
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type:this.tag
        }
      }).then(res => {
        //console.log(res)
        this.list = res.data.data
       //chulishichang
       for(let i=0;i<this.list.length;i++){
           //huoquhaomiaoshu
          let duration = this.list[i].duration
          let min = parseInt(duration/1000/60)
          if(min<10){
            min='0'+min
          }
          let sec = parseInt(duration/1000%60) 
          if(sec<10){
              sec='0'+sec
          }
          //console.log(min+":"+sec)
          this.list[i].duration = `${min}:${sec}`
       }
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
      },
     play: function() {
      this.show = !this.show;
    },
    }

}
</script>

<style>

.top-bar {
    float: right;
    margin-right: -300px;
    margin-top: 40px;
}

.top-bar .item {
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
.top-bar .item.active {
  color: #ff4040;
  font-size: 18px;
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

.el-table {
    max-width: 130%;
    width:130%;
    margin-left: 90px;
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
.img-warp .el-icon-video-play:before {
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
</style>