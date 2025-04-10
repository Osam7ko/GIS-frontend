<template>
  <router-view/>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      tasks: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

/* 
general 
-------
*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #f8f9fa;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  /* #app {
    padding: 60px 0;
  } */
  
  .container {
    max-width: 480px;
    margin: 0 auto;
    padding: 0 15px;
  }
  img{
    width: 120px;
    margin-top: 20px;
  }


  input[type="text"] {
    width: 100%;
    height: 50px;
    font: 15px/1.4 "Poppins", sans-serif;
    /* padding: 15px;
    background: #f3f3f3;
    color: #333;
    border: 1px solid transparent;
    border-radius: 10px; */
    transition: border 0.3s linear;
  }
  
  input[type="text"]:focus {
    outline: none;
    /* border: 1px solid #4ec5c1; */
  }
  
  button {
    cursor: pointer;
    font: 15px/1.4 "Poppins", sans-serif;
    transition: all 0.3s linear;
  }
  
  button:focus {
    outline: none;
  }
  
  h1,h2 {
    font-size: 22px;
  }

  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .title {
    text-align: center;
    margin: 0 0 20px;
  }
  
  

</style>
