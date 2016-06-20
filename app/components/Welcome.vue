<template>
  <div v-for="(id, user) in users">
    <!-- Here v-if would check for a flag in the children of the tree, if display the name, if not "Hi!" is good enough -->
    <div class="content welcome">
    <h1><span id="clock"></span></h1>
    <h2>Hi {{user.Name}}!</h2>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    props: ['users'],
    ready:
    function () {
      setInterval(function(){
        var now=new Date();
        var time=now.toLocaleTimeString();
        document.getElementById("clock").textContent=time;
      },1000);
    }
  }
</script>