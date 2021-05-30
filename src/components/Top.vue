<template>
  <div class="nav">
    <div class="top-left">
      <div class="left"></div>
      <div class="midole"></div>
      <div class="right"></div>
    </div>
    <a href="" class="return"><i class="el-icon-back"></i></a>
    <a href="" class="go"><i class="el-icon-right"></i></a>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="inputValue"
      @keyup.enter="toSerch"
      :plain="true"
      @click="open2"
      
      class="input"
    >
    </el-input>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default {
 
  data() {
    return {
      inputValue: "",
     
    };
  },
  methods: {
   
    toSerch() {
      if (this.inputValue == "") {
        //alert("请输入搜索内容！");
        //this.open()
        this.$message.warning('请输入搜索内容！！！')
      } else {
        //去搜索页，携带数据
        
        this.$router.push(`/result?musicname=${this.inputValue}`);
      
      }
    },
  },
  setup() {
    return {
      inputValue: ref("")
    };
  },
 
 }
     

</script>

<style>
body {
  padding: 0;
  margin: 0;
}
.nav {
  width: 100%;
  height: 70px;
  background: rgb(84, 92, 100);
  position: relative;
}
.top-left {
  position: absolute;
  width: 120px;
  left: 20px;
 
}
.left,
.midole,
.right {
  position: absolute;
  display: flex;
  width: 20px;
  height: 20px;
  top: 10px;
  border-radius: 50%;
  background: rgb(235, 99, 99);
}
.midole {
  background: rgb(223, 223, 83);
  left: 30px;
}
.right {
  background: rgb(95, 236, 95);
  left: 60px;
}
.input {
  width: 20%;
  position: absolute;
  display: flex;
  outline: none;
  font-size: 16px;
  height: 30px;
  border-radius: 10px;
  top: 20px;
  right: 50px;
}
.el-icon-back,
.el-icon-right {
  font-weight: 900;
  font-size: 30px;
  color: #fff;
}
.return,
.go {
  position: absolute;
  top: 25px;
  left: 140px;
}

.go {
  left: 190px;
}
#simg {
  position: absolute;
  display: flex;
  height: 35px;
  background-color: #94f0cc;
  border-radius: 10px;
  top: 20px;
  right: 500px;
  z-index: 1;
}

</style>