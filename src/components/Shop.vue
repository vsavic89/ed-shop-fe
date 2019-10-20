<template>
    <div>     
        
        <div id="content" v-if="products.length > 0">            
            <div v-for="(product, index) in products" :key="index" class="products">                
                <div class="product">
                    <img :src="product.image" />
                    <div class="title">
                        <p>{{ product.title }}</p>
                    </div>
                    <div class="price">
                        <p>{{ product.price + '$' }}</p>
                    </div>
                    <div class="desc">
                        <p>{{ product.description }}</p>
                    </div>
                    <div id="addToCart">
                        <button @click="addToCart(index)">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>             
    </div>
</template>
<script>
import { productsService } from '../services/products.service';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            products: [],
            errors: [],            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {            
            vm.getProducts();
        })
    },
    methods: {
        getProducts(){            
            productsService.getAll()
                .then(response => {                   
                    this.products = response.data;                                             
                }).catch(e => {
                    this.errors.push(e);
                })
        },
        ...mapActions({
            addItemToCart: 'addToCart'
        }),
        addToCart(productID){                       
            this.addItemToCart({                    
                    item: this.products[productID]
                }).then(() => {
                    //alert('An item is added to the cart!');                                  
                }).catch(e => {                    
                   this.errors.push(e.response);
            });
        }
    },    
}
</script>
<style>    
    #content {    
        clear: both;                                    
        width:65%;
        margin: 20px auto;         
    }
    #content h1,h2,h3{    
        text-align: center;          
    }
    div.product {                
        float: left;        
        background-color: white;        
        width: 292px; 
        height: 372px;       
        border-radius: 10px;
        box-shadow: 0px 2px 2px 0px #979797;
        margin-right: 50px;
        margin-bottom: 50px;
    }
    div.product img {
        width:292px;
        height: 176px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    div.title {
        float:left;                
        width: 70%; 
        font-size: 22px;
        font-weight: bold;       
    }
    div.price {
        float:right;
        width: auto;
        margin-right: 5px;
        padding: 0;        
        font-size: 22px;
        font-weight: bold;
        color: #28057F;  
    }
    div.title p{
        padding: 15px;
        margin: 0;
    }
     div.price p{
        float:right;
        padding: 15px;
        margin: 0;        
    }
    div.desc {
        clear:both;  
        margin-left: 5px;              
        width: 100%;
        height: 60px;
    }
    div.desc p {
        margin: 0;
        padding: 10px;
    }
    #addToCart {
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }
    #addToCart button {
        clear: both;
        width:90%;
        display: inline-block;        
        background-color: #B52F8F;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px auto; 
        cursor: pointer;
        border-radius: 4px;
        font-weight: bold;
    }
</style>