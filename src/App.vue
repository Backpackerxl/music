<template>
  <div>
    <top></top>
    <midole></midole>
  </div>
</template>

<script>
import top from "./components/Top";
import midole from "./components/Midole";
export default {
  components: {
    top,
    midole
  },
  data() {
    return {
      
    };
  }
};
</script>

<style>
body{
  background-image: url("assets/bg.png");
}
</style>