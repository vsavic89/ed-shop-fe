<template>
  <div id="app">
    <div id="nav">
      <div id="header">
        <div id="logo">
          <a href="https://www.etondigital.com/"><img class="logo" src="./assets/logo.png" alt="Eton Digital" /></a>
        </div>      
        <div id="cart" :class="isActive('/cart')">                                           
              <img v-on:click="showCart = !showCart" class="cart" src="./assets/cart.png" alt="Cart" style="cursor:pointer;"/>
              <span v-if="cart.length > 0" class="badge">{{cart.length}}</span>            
        </div>         
        <div id="shop" :class="isActive('/shop')">
          <router-link to="/shop" v-on:click.native="showCart = false">Shop</router-link>
        </div>        
      </div>    
    </div>        
    <!-- shopping cart -->
    <transition name="fade">      
      <div v-if="showCart" class="shopping-cart">        
        <div v-if="cart.length > 0">    
          <div v-for="(product, index) in cart" :key="index">
            <div class="item">
              <img :src="product.image" />
              <p>{{ product.title }}</p>
              <hr>
            </div>
          </div>
          <router-link to="/cart"><button @click="showShoppingCart()">Go to Checkout</button></router-link>            
        </div>
        <div v-else>
          <h2>Your cart is empty!</h2>
        </div>             
      </div> 
    </transition>
    <!-- end shopping cart --> 
    <div id="content">     
      <router-view/>   
      <div id="footer">
        <p>&copy; {{ getYear() }} Vladimir Savic</p>
      </div>
    </div>     
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
  data(){
    return {
      showCart: false
    }
  },
  methods : {
    getYear(){
      return moment(new Date()).format('YYYY');
    },
    isActive(path){
      if (path === this.$router.currentRoute.path)
        return 'active';
      else 
        return 'deactive';
    },  
    showShoppingCart(){      
      this.showCart = !this.showCart;
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
  height:auto;
}

#nav {        
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
  padding-left: 10px; 
}
#nav #header #cart {   
  float:right;    
  padding: 28px 0 15px 0;    
  margin-right: 85px;  
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
    margin-top:-5px;
    margin-left: -10px;
    border-radius: 10px;
    color: white;
    display: inline-block;
    font-size: 10px;
    line-height: 1;
    padding: 3px 7px;
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
}
.shopping-cart {  
  z-index: 1000;
  margin: -15px 80px;
  float: right;
  background: white;
  width: 246px;
  position: relative;
  border-radius: 10px;
  padding: 20px;
}  
.shopping-cart:after {
	bottom: 100%;
	left: 90%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-bottom-color: white;
	border-width: 8px;
	margin-left: -8px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.shopping-cart button {    
    width: 214px;
    display: inline-block;        
    background-color: #29057E;
    border: none;
    color: white;
    padding: 10px 28px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 0 0 15px; 
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
}
.item img{
  float: left;
  margin:10px;
  width: 51px;
  height: 31px;
}
hr {
  clear:both;
  height: 1px;
  background-color: #f2f2f2;
  border: 0;
  background: linear-gradient(90deg, #868686 0%,  #f2f2f2 130% );
}
.item p {
  float:left;  
  font-size: 14px;
  font-weight: bold;
}
</style>
