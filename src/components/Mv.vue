<template>
  <div>
     <div id="mv">
     <div id="top">
     <div class="first">
      <span class="item" >地区:</span>
      <span class="item" :class="{ active: area == '全部' }" @click="area = '全部'" >全部</span>
      <span class="item" :class="{ active: area == '内地' }" @click="area = '内地'" >内地</span>
      <span class="item" :class="{ active: area == '港台' }" @click="area = '港台'" >港台</span>
      <span class="item" :class="{ active: area == '欧美' }" @click="area = '欧美'" >欧美</span>
      <span class="item" :class="{ active: area == '日本' }" @click="area = '日本'" >日本</span>
      <span class="item" :class="{ active: area == '韩国' }" @click="area = '韩国'" >韩国</span>
      </div>
      <br>
     <br>
     <br>
     <div class="second">
      <span class="item" >类型:</span>
      <span class="item" :class="{ active: type == '全部' }" @click="type= '全部'" >全部</span>
      <span class="item" :class="{ active: type == '官方版' }" @click="type = '官方版'" >官方版</span>
      <span class="item" :class="{ active: type == '原声' }" @click="type= '原声'" >原声</span>
      <span class="item" :class="{ active: type == '现场版' }" @click="type = '现场版'" >现场版</span>
      <span class="item" :class="{ active: type == '网易出品' }" @click="type = '网易出品'" >网易出品</span>
     
     </div>
     <br>
     <br>
     <br>
     <div class="third">
      <span class="item" >排序:</span>
      <span class="item" :class="{ active: order == '上升最快' }" @click="order = '上升最快'" >上升最快</span>
      <span class="item" :class="{ active: order == '最热' }" @click="order = '最热'" >最热</span>
      <span class="item" :class="{ active: order == '最新' }" @click="order = '最新'" >最新</span>
     
     </div>
     </div>
     <div id="container">
     <!--mvtuijian-->
 
     <div id="foomv">
    
     <div class="items">
     <div class="item" v-for="(item,index) in list" :key="index">
     <div class="img-warp">
     <img :src="item.cover" @click="play">
      <span v-if="show" class="playvidols" ><i class="el-icon-video-play"  @click="toMv(item.id)" ></i></span>
        
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
     </div>
     </div>
     </div>
     </div>
     </div>
     </div>
     <div id="bottom">
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
</template>

<script>
import axios from 'axios'
export default {
  data (){
    return {
      //zongtiaoshu
      total:20,
      //yema
      page:1,
      //yeronliang
      limit:8,
      //diqu
      area:"全部",
      //leixing
      type:"全部",
      //paixu
      order:"上升最快",
      list:[],
      show:false
    }
  },
  methods:{
    play:function(){
      this.show=!this.show
    },
    toMv(id){
      this.$router.push(`/mvlist?q=${id}`)
     },
     getListMv(){
        axios({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
         area:this.area,
         type:this.type,
         order:this.order,
         //shuliang
         limit:this.limit,
         //yema
         offset:(this.page-1)*this.limit
         
        }
      }).then(res => {
        //console.log(res)
        this.list=res.data.data
        for (let i =0;i<this.list.length;i++){
          if(this.list[i].playCount>100000){
            this.list[i].playCount = parseInt(this.list[i].playCount/10000)+'万'
          }
        }
        //baochuyeshu
        //jiekouwenti
        if(this.data.count){
          this.total = res.data.count
        }
       
      });
     },
     handelCurrentChange(val){
       this.page = val
       this.getListMv()
     }
  },
   created (){
     //huoqutupian
        this.getListMv()
    },
     watch: {
       order(){
         this.page =1
        this.getListMv()
       },
       area() {
         this.page =1
         this.getListMv()
    },
    type() {
        this.page =1
        this.getListMv()
    },
    
  },

}
</script>

<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ff4040;
  color: #fff;
}
#container{
  position: relative;
}
#container #foomv{
    position: absolute;
    top:130px;
    margin-left: 120px;
}
#container #foomv h3{
    margin-left: 25px;
}
#container #foomv .num .name .singer{
    position: absolute;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
   
}
#container #foomv .items{
    width: 930px;
}
#container #foomv .items .item{
    position: relative;
    height: 180px;
    margin-top: 100px;
    border-radius: 5px;
}
#container #foomv i.el-icon-view {
    position: absolute;
    margin-left: 120px;
    top: 5px;
    background: white;
    font-size: 20px;
    border-radius: 10px;
    height: 20px;
    width: 20px;
}
#container #foomv .num{
    position: absolute;
    top:5px;
    left: 140px;
    color: white;
}
#container .info-warp .name{
    position: absolute;
    bottom: -30px;
    font-size: 16px;
     width: 200px;
    
}
#container .img-warp img{
    width: 200px;
    height: 180px;
    border-radius: 5px;
}
#container .info-warp .singer{
    position: absolute;
    bottom: -50px;
    font-size: 14px;
    width: 200px;
     color: rgba(105, 105, 102, 0.794);
}
#bottom {
    position: absolute;
    top: 1340px;
    height: 50px;
    margin-top: -1200px;
    margin-left: 100px;
    /* margin-bottom: 500px; */
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
#top {
  position: absolute;
  margin-left: 130px;
  margin-top: 60px;
  z-index: 100;
}

#top .first {
    width: 800px;
}
#top .item {
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
#top .item.active {
  color: #ff4040;
  font-size: 18px;
  width: 90px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  background: #f3e6e68c;
}

.playvidols {
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
.playvidols .el-icon-video-play:before {
    margin-left: 0px;
    margin-top: -10px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
.playvidols i.el-icon-video-play {
    cursor: pointer;
    margin-left: 10px;
    /* margin-bottom: 10px; */
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
    color: #f70000;
}
</style>