<template>
    <div>                              
        <div v-if="products.length > 0" class="products">
            <div id="findProduct">
                <label for="filter">Find product by title or description: </label>
                <input type="text" name="filter" v-model="searchTerm" placeholder="(type here)"/>
            </div>
            <div v-for="(product, index) in filteredProducts" :key="index">                
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
        <errors-handler 
            :errors="showErrors"
        />                        
    </div>
</template>
<script>
import { productsService } from '../services/products.service';
import { mapActions } from 'vuex';
import ErrorsHandler from './ErrorsHandler';
export default {
    name: "Shop",        
    components: {
      ErrorsHandler
    },
    data() {
        return {
            products: [],
            errors: [], 
            searchTerm: ''           
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
                    this.$emit("animate");                                                           
                }).catch(e => {                    
                   this.errors.push(e.response);
            });            
        },
    },  
    computed: {
        showErrors(){
            return this.errors;
        },
        filteredProducts(){
            return this.products.filter(product => 
                (product.title.toLowerCase().includes(this.searchTerm.toLowerCase()))                
                ||
                (product.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
            );
        },
    },  
}
</script>
<style>    
    #content {            
        width:100%;         
        position: absolute; 
        background-color: #f2f2f2;               
    }
    #content div.products {
        padding-top: 30px;
        width:65%;
        margin: 0 auto;
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
#findProduct {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-bottom:20px;
}
#findProduct input[type=text] {
  width:40%;
  height: 30px;  
  padding: 0;
  margin: 0;
  background-color: white;  
  background-image: url('../assets/searchicon.png');
  background-position: 0;
  background-repeat: no-repeat;
  padding-left: 40px;
  border: 2px solid #B52F8F;
}
</style>