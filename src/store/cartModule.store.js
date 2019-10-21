const cart = JSON.parse(localStorage.getItem('cart')) || [];

export const CartModule = {
  state: {
    cart,
    error: null
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
    }
  },
  getters: {
    getCart(state){
      return state.cart;
    }
  }
}