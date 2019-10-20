import axios from 'axios';
import { api } from './api/api';
export default class ProductsService {
    constructor(){        
        axios.defaults.baseURL = api.getAPIURL();
    }
    getAll(){
        return axios.get('products');
    }
    getProduct(productID){
        return axios.get('products/' + productID);
    }
    deleteProduct(productID){
        return axios.delete('products/' + productID);
    }
    editProduct(product){
        return axios.put('products/' + product.id, product);
    }
    addProduct(product){
        return axios.post('products', product);
    }

}
export const productsService = new ProductsService();