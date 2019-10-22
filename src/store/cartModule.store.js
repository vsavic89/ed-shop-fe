const cart = JSON.parse(localStorage.getItem('cart')) || [];
const productsList = JSON.parse(localStorage.getItem('productsList')) || [];
const animate = false;

export const CartModule = {
  state: {
    cart,
    productsList,
    error: null,    
    animate
  },
  mutations: {
    addItemToCart(state, payload){            
      state.cart.push(payload.item);
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeItemFromCart(state, payload){
      state.cart.splice(payload, 1);
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    emptyCart(state){
      state.cart = [];
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setProducts(state, payload){      
      state.productsList = payload;            
      window.localStorage.setItem('productsList', JSON.stringify(state.productsList));
    },
    remProduct(state, payload){
      for(let i=0; i < state.productsList.length ; i++){        
        if(state.productsList[i].id == payload){          
          state.productsList.splice(i, 1);          
          break;
        } 
      }
      window.localStorage.setItem('productsList', JSON.stringify(state.productsList));           
    },
    edProduct(state, payload){
      for(let i=0; i < state.productsList.length ; i++){        
        if(state.productsList[i].id == payload.id){          
          state.productsList[i].title = payload.title;
          state.productsList[i].description = payload.description;
          state.productsList[i].price = payload.price;
          state.productsList[i].image = payload.image;        
          break;
        } 
      }
      window.localStorage.setItem('productsList', JSON.stringify(state.productsList));   
    },
    adProduct(state, payload){
      var maxID = 0;
      for(let i=0; i < state.productsList.length; i++){
        if(state.productsList[i].id > maxID){
          maxID = state.productsList[i].id;
        }
      }
      payload.id = maxID + 1;
      state.productsList.push(payload);      
    },
    stAnimate(state){            
      state.animate = !state.animate;
    }
  },
  actions: {
    addToCart(context, item){
      context.commit('addItemToCart', item);
    },
    removeItem(context, index){
      if (index === -1){        
          context.commit('emptyCart');
      }else{
        context.commit('removeItemFromCart', index);
      }
    },
    addProducts(context, items){        
      context.commit('setProducts', items);
    },
    removeProduct(context, index){      
      context.commit('remProduct', index);
    },
    editProduct(context, product){
      context.commit('edProduct', product);
    },
    addProduct(context, product){
      context.commit('adProduct', product);
    },
    setAnimate(context){      
      context.commit('stAnimate');
    }
  },
  getters: {
    getCart(state){
      return state.cart;
    },
    getProducts(state){
      return state.productsList;
    },
    getAnimate(state){
      return state.animate;
    }
  }
}