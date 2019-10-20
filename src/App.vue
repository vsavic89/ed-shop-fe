<template>
  <div id="app">
    <div id="nav">
      <div id="header">
        <div id="logo">
          <a href="https://www.etondigital.com/"><img class="logo" src="./assets/logo.png" alt="Eton Digital" /></a>
        </div>      
        <div id="cart" :class="isActive('/cart')">                               
            <router-link to="/cart">
              <img class="cart" src="./assets/cart.png" alt="Cart" />
              <span v-if="cart.length > 0" class="badge">{{cart.length}}</span>
            </router-link>            
        </div>         
        <div id="shop" :class="isActive('/shop')">
          <router-link to="/shop">Shop</router-link>
        </div>        
      </div>    
    </div>    
    <router-view/>    
    <div id="footer">
        <p>&copy; {{ getYear() }} Vladimir Savic</p>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
  methods : {
    getYear(){
      return moment(new Date()).format('YYYY');
    },
    isActive(path){
      if (path === this.$router.currentRoute.path)
        return 'active';
      else 
        return 'deactive';
    }
  },
  computed: {
        ...mapGetters({
            cart: "getCart"
        })
  }
}
</script>
<style>
#app {
  font-family: 'Proxima Nova', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background: #F2F2F2;
  width:100%;
}

#nav {    
  margin: 0;
  height: 84px;
  background: linear-gradient(90deg, #25047E 0%,  #C23390 100% );
}
#nav #header {
  margin: 0;
  width: 100%;
  height: auto;  
}
#nav #header #logo {  
  float: left;
  width: 20%;  
  margin-left: 30px;
  padding: 21px 0 0 60px;    
}
#nav #header #shop {
  float: right;  
  width: 66px;  
  height: auto;
  margin-right: 50px;  
  font-size: 23px;  
  padding-top: 26px;    
  padding-bottom: 25px; 
}
#nav #header #cart {   
  float:right;    
  padding: 28px 0 15px 0;    
  margin-right: 60px;  
}
#nav #shop a {
  color: white;
  text-decoration: none; 
}

#footer {
  padding-top: 10px;
  clear: both;
  text-align: center;
}
.active {
  border-top: 3px solid #81C4EC;
  border-bottom: 3px solid #81C4EC;  
}
.badge {
    background-color: #2A067E;
    border-radius: 10px;
    color: white;
    display: inline-block;
    font-size: 10px;
    line-height: 1;
    padding: 3px 7px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
}
</style>
