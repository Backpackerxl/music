<template>
  <div>
    <div class="music">
      <h1 class="tailetxt">{{ item }}</h1>
      <span class="datanum">为您找到{{count}}条数据</span>
    </div>
    <el-tabs v-model="activeIndex" class="restul">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
        <thead>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in songList" :key="index" class="el-table__row" @dblclick="playmusic(item.id)" style="cursor: pointer;">
        <td>{{index+1}}</td>
        <td>
        <div class="song-warp">
        <div class="name-warp">
        <span>{{item.name}}</span>
        <i v-if="item.mvid!=0" class="el-icon-video-camera"></i>
        </div>
        <span v-if="item.alias.length!=0">{{item.alias[0]}}</span>
        </div>
        </td>
        <td>{{item.artists[0].name}}</td>
        <td>{{item.album.name}}</td>
        <td>{{item.duration}}</td>
        </tr>
        </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists" id="searchlist">
      <div class="listmv">
      <div class="litems">
        <div class="litem" v-for="(item, index) in playlist" :key="index">
          <div class="limg-warp">
            <img @click="black" :src="item.coverImgUrl" />
            <span  v-if="show" class="playvido" ><i class="el-icon-video-play" @click="toPlayList(item.id)"></i></span>
            <span class="liconfont licon-play"> </span>
            <div class="lnum-warp">
              <div class="liconfont licon-play" v-if="show">
                <i class="el-icon-view"></i>
                <div class="lnum">{{item.playCount}}</div>
                
              </div>
            </div>
            <div class="linfo-warp">
              <!--geming-->
              <div class="lname">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv" id="searchlist">
        <div class="listmv">
      <div class="litems">
        <div class="litem" v-for="(item, index) in playmv" :key="index">
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
      </el-tab-pane>
    </el-tabs>
     <div id="audio">
     <audio :src="url" autoplay controls></audio>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // inject:['reload'],
  data() {
    return {
      activeName: "second",
      activeIndex:'songs',
      songList:[],
      count:0,
      url:"",
      playlist:[],
      show:false,
      playmv:[]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    black: function() {
      this.show = !this.show;
    },
     playmusic(id){
       //console.log(val)
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
     },
     //qugedanxianqinye
     toPlayList(id){
      this.$router.push(`/playlist?q=${id}`)
     },
     toMv(id){
      this.$router.push(`/mvlist?q=${id}`)
     }
  },
  created() {
    //console.log(this.$route)
    //console.log(this.$route.query.musicname)
    
    this.item = this.$route.query.musicname;
     axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
         keywords:this.$route.query.musicname,
         type:1,
         limit:20
        }
      }).then(res => {
       // console.log(res)
        
        this.songList = res.data.result.songs
        this.count = res.data.result.songCount
        
         for(let i=0;i<this.songList.length;i++){
           //huoquhaomiaoshu
          let duration = this.songList[i].duration
          let min = parseInt(duration/1000/60)
          if(min<10){
            min='0'+min
          }
          let sec = parseInt(duration/1000%60) 
          if(sec<10){
              sec='0'+sec
          }
          //console.log(min+":"+sec)
          this.songList[i].duration = `${min}:${sec}`
       }
      });
  },
   
  watch:{
    activeIndex(){
      //songs

      //lists
      //mv

      let type = 1;
      switch(this.activeIndex){
        case 'songs':
        type=1;
        break;
        case 'lists':
          type=1000;
          break;
          case 'mv':
            type=1004;
            break;
            default:
              console.log("参数传递错误")
              break;
      }
        axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
         keywords:this.$route.query.musicname,
         type,
         limit:20
        }
      }).then(res => {
        //console.log(res)
        if(type == 1){
       this.songList = res.data.result.songs
       this.count = res.data.result.songCount
       
        for(let i=0;i<this.songList.length;i++){
          //huoquhaomiaoshu
         let duration = this.songList[i].duration
         let min = parseInt(duration/1000/60)
         if(min<10){
           min='0'+min
         }
         let sec = parseInt(duration/1000%60) 
         if(sec<10){
             sec='0'+sec
         }
         //console.log(min+":"+sec)
         this.songList[i].duration = `${min}:${sec}`
       }
        }else if(type==1000){
          //gedanluoji
          this.playlist=res.data.result.playlists
          //gedanzongsu
          this.count = res.data.result.playlistCount
         for(let i=0;i<this.playlist.length;i++){
              //huoquhaomiaoshu
         
           if(this.playlist[i].playCount>100000){
                this.playlist[i].playCount=parseInt(this.playlist[i].playCount/10000)+"万"
           }
         }
        }else{
         this.playmv=res.data.result.mvs
          //mvshuju
          this.count = res.data.result.mvCount
         for(let i=0;i<this.playmv.length;i++){
            let duration = this.playmv[i].duration
          let min = parseInt(duration/1000/60)
          if(min<10){
            min='0'+min
          }
          let sec = parseInt(duration/1000%60) 
          if(sec<10){
              sec='0'+sec
          }
          //console.log(min+":"+sec)
          this.playmv[i].duration = `${min}:${sec}`
           if(this.playmv[i].playCount>100000){
                this.playmv[i].playCount=parseInt(this.playmv[i].playCount/10000)+"万"
           }
         }
      }
      });
    }
  }
};
</script>

<style>
h1 {
  margin-top: 50px;
  margin-left: 100px;
}
.tailetxt{
  position: relative;
}
.datanum {
    position: absolute;
    margin-left: 100px;
    margin-top: -25px;
    color: #8c8484f2;
    /* font-size: 14px; */
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
.element.style {
  width: 30px;
}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
 #result .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ff4040;
  color: #fff;
}
#result .el-pagination {
  margin-top: -500px;
}
#result .el-pagination .btn-prev .el-icon .el-pagination .btn-next .el-icon {
  font-size: 20px;
}
#result .el-pagination.is-background .btn-next,
#result .el-pagination.is-background .btn-prev,
#result .el-pagination.is-background .el-pager li {
  min-width: 40px;
  height: 40px;
  font-size: 20px;
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
#searchlist .listmv {
    /* top: 1395px; */
    margin-top: -40px;
    margin-left: 40px;
}
#searchlist .listmv h3 {
  margin-left: 25px;
}
#searchlist .listmv .lnum .lname {
  position: absolute;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#searchlist .listmv .litems {
  width: 930px;
}
#searchlist .listmv .litems .litem {
  position: relative;
  height: 180px;
  border-radius: 5px;
  margin-top: 70px;
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
#searchlist .time {
    position: absolute;
    top: 0px;
    right: 10px;
    color: rgb(255 255 255);
}
#searchlist .singer{
    font-size: 16px;
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
img {
  cursor: pointer;
}
img:hover{
  border-bottom: 2px solid red;
  border-top:2px solid red;
  border-left:2px solid red;
  border-right:2px solid red;
}
</style>