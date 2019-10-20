export default class API {        
    constructor(){
        this.apiURL = 'https://my-json-server.typicode.com/brankostancevic/products/';        
    }
    getAPIURL(){
        return this.apiURL;
    }
}
export const api = new API()