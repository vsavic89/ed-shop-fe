<template>
    <div>
        <div id="content">
            <h1>Your Cart</h1>
            <div v-if="cart.length > 0">
                <div v-for="(item, index) in cart" :key="index">                    
                    <div class="col1 cart-product-image">
                        <img :src="item.image" />
                    </div>
                    <div class="col2" style="float:left;">
                        <div class="cart-product-titleDesc">
                            <p class="title">{{ item.title }}</p>
                            <br />                        
                            <p class="desc">{{ item.description }}</p>                                                                                     
                        </div>             
                    </div>
                    <div class="col3" style="float:right;">
                        <p class="cart-product-price">{{ item.price + '$' }}</p>
                        <br />
                        <button @click="removeItem(index)">Remove</button>
                    </div>       
                    <br style="clear:both;"/>
                    <hr>                                        
                </div> 
                <div id="total">
                    <p class="total">Total</p>
                    <p class="price">{{ getSum(cart) + '$' }}</p>
                </div>
            </div>
            <div v-else>
                <h3>is empty!</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            
        }
    },
    computed: {
            ...mapGetters({
                cart: "getCart"
        })
    },
    methods: {
        ...mapActions({
                removeItemFromCart: 'removeItem'
        }),
        removeItem(index){
            this.removeItemFromCart(index).then(() => {
                    //  alert('An item is added to the cart!');                                  
                    }).catch(e => {                    
                    this.errors.push(e.response);
                });
        },
        getSum(cart){
            let total = 0;
            for(let i=0; i < cart.length; i++)   
            {                             
                total += cart[i].price;
            }
            return total;
        }
    },
}
</script>
<style>
div.cart-product {
    width:80%;
    margin: 0 auto;
}
div.cart-product-image img{
    float: left;
    width: 110px;
    height: 67px;
    border-radius: 5px;
    margin-right: 30px;
    margin-bottom: 30px;
}
div.cart-product-titleDesc p.title{
    float:left;
    margin-top: 10px;
    font-weight: bold;
    
}
div.cart-product-titleDesc p.desc{
    float:left;  
    margin-top: 1px;  
}
div p.cart-product-price{
    float:right;  
    margin: 0;
    font-size: 27px;
    font-weight: bold;
}
div p.cart-product-price{
    float:right;  
    margin: 0;
    font-size: 27px;
    font-weight: bold;
}
div.col3 button {
  margin-top: 10px;  
  background: none!important;
  border: none;
  padding: 0!important;    
  color: red;  
  cursor: pointer;
  font-size: 16px;
}
#total p.total{    
    float:left;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
    padding: 0;
    text-align: left;    
}
#total p.price{    
    float:right;
    margin-top: 20px;
    padding: 0; 
    font-size: 32px;
    font-weight: bold;
    color: #28057F;
}
</style>