<template>
    <div>
        <div class="products">  
            <button class="addProduct" @click="addActiveP()">Add New Product</button>   
            <button class="editProduct" @click="editActiveP()">Edit Product</button>   
            <hr>                                        
            <div v-if="showActive">
                <h1>Product info</h1>
                <div v-if="product"> 
                    <div id="productInfo"> 
                        <div class="col1">
                            <img :src="product.image" width="150"/>
                        </div> 
                        <div class="col2">
                            <p>{{ product.title }}</p>
                            <div class="col3">                        
                                <p>{{ product.description }}</p>
                            </div>
                        </div>    
                        <div class="col4">
                            <p>{{ product.price + '$' }}</p>    
                            <button @click="deleteProduct()">Delete</button>                             
                        </div>                                                   
                        <hr>  
                    </div>                               
                </div>
                <div v-else>
                    <h2>Sorry, no product info to show!</h2>
                </div>                
            </div>
            <div v-else>
                <div class="form">
                    <div class="form-col1">
                        <p>Title:</p>
                        <p>Description:</p>
                        <p>Price ($):</p>
                        <p>Image URL:</p>
                    </div>
                    <div class="form-col2">
                        <input type="text" name="title" required v-model="productTemp.title"/>
                        <br/>
                        <input type="text" name="description" required v-model="productTemp.description"/>
                        <br />
                        <input type="number" name="price" required v-model="productTemp.price"/>
                        <br />
                        <input type="text" name="imageUrl" required v-model="productTemp.image" />
                        <br />
                    </div>
                    <button v-if="addActive" @click="addProduct()">Add new Product</button>
                    <button v-else @click="editProduct()">Edit Product</button>
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
    components: {
        ErrorsHandler
    }, 
    computed: {
        showErrors(){
            return this.errors;
        }  
    },
    data(){
        return {
            addActive: false,
            editActive: false,
            showActive: false,
            product: null,
            productID: null,
            errors: [],
            productTemp: { id: 0, title: '', description: '', price: '', image: '' },
            products: []
        }
    },
    methods: {
      deleteProduct(){
          var r = confirm("Are you sure?");
          if (r == true) {                
            productsService.deleteProduct(this.productID)
                .then(() => {
                    this.remProducts(this.productID).then(() => {              
                        this.$router.push('/shop');
                    }).catch(e => {
                        this.errors.push(e.response);
                    })
                }).catch(e => {
                    this.errors.push(e.response);
                });              
          }                    
      },
      editProduct(){
          productsService.editProduct(this.productTemp)
            .then(() => {                
                this.edProduct(this.productTemp).then(() => {              
                        this.$router.push('/shop');
                    }).catch(e => {
                        this.errors.push(e.response);
                    })
            }).catch(e => {
                this.errors.push(e.response);
            });
      },
      addProduct(){
          productsService.addProduct({ title: this.productTemp.title, description: this.productTemp.description, price: this.productTemp.price, image: this.productTemp.image })
            .then(() => {                
                this.adProduct(this.productTemp).then(() => {              
                        this.$router.push('/shop');
                    }).catch(e => {
                        this.errors.push(e.response);
                    })
            }).catch(e => {
                this.errors.push(e.response);
            });
      },
      editActiveP(){
          this.editActive = true;
          this.addActive = false;
          this.showActive = false;

          this.productTemp.title = this.product.title;
          this.productTemp.description = this.product.description;
          this.productTemp.price = this.product.price;
          this.productTemp.image = this.product.image;
          this.productTemp.id = this.productID;
      },
      addActiveP(){
          this.editActive = false;
          this.addActive = true;
          this.showActive = false;

          this.productTemp.title = '';
          this.productTemp.description = '';
          this.productTemp.price = '';
          this.productTemp.image = '';
          this.productTemp.id = this.productID;
      },
      ...mapActions({
            remProducts: 'removeProduct',
            edProduct: 'editProduct',
            adProduct: 'addProduct'
      }),
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {                        
            if (to.params.id){
                vm.productID = to.params.id;
                vm.products = vm.$store.getters.getProducts;                
                if(vm.products.length ===0){
                productsService.getProduct(vm.productID)
                    .then(response => {
                        vm.product = response.data;                                         
                    }).catch(e => {
                        vm.errors.push(e);
                    });
                } else {
                    for(let i=0;i < vm.products.length; i++){
                        if(vm.products[i].id == vm.productID){
                            vm.product = vm.products[i];
                            break;
                        }
                    }
                }
                vm.showActive = true;    
            }
        })        
    },
}
</script>
<style>
#productInfo {
    width:100%;
    margin: 0 auto;
    height: auto;       
}
#productInfo hr{
    clear: both;    
}
#productInfo .col1 {    
    margin-right: 20px;    
}
#productInfo .col1 img {
    border-radius: 5px;
}
#productInfo .col1,.col2,.col3 {    
    float:left;           
}
#productInfo .col2 p {
    font-size: 20px;
    font-weight: bold;
    padding: 0;
}
#productInfo .col3 p {    
    font-size: 16px; 
    font-weight: normal;   
    padding: 0;
    margin: 0;
}

#productInfo .col4 {    
    float:right;              
}

#productInfo .col4 p {
    font-size: 26px;
    font-weight: bold;
    padding: 0;
}
#productInfo button {
        clear: both;
        width:100%;
        display: inline-block;        
        background-color: red;
        border: none;
        color: white;
        padding: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px auto; 
        cursor: pointer;
        border-radius: 4px;
        font-weight: bold;
}
#productInfo button, div.form button {
        clear: both;
        width:100%;
        display: inline-block;        
        background-color: red;
        border: none;
        color: white;
        padding: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px auto; 
        cursor: pointer;
        border-radius: 4px;
        font-weight: bold;
}
.products button.addProduct {
        clear: both;
        width:120px;
        display: inline-block;        
        background-color: blue;
        border: none;
        color: white;
        padding: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px 30px 0 0; 
        cursor: pointer;
        border-radius: 4px;
        font-weight: bold;
}
.products button.editProduct {
        clear: both;
        width:120px;
        display: inline-block;        
        background-color: green;
        border: none;
        color: white;
        padding: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px auto; 
        cursor: pointer;
        border-radius: 4px;
        font-weight: bold;
}
div.form {    
    width: 400px;
    margin: 0 auto;
    text-align: center;
}
div.form-col1 {
    float:left;
    margin-left: 20px;
    text-align: right;
}
div.form-col2 {
    float: left;    
}
div.form-col2 input {
    margin-top: 13px;
    margin-left: 20px;
    width:250px;
}

</style>