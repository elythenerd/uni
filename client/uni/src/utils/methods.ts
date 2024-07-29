import axios, { AxiosInstance } from "axios";

class methods{
    private method: AxiosInstance;

    constructor() {
        this.method = axios.create({
            withCredentials: true
        });
    }
    async get(url:string){
        return this.method.get(url)
    }
    async patch(url:string){
        return this.method.patch(url)
    }
    async post(url:string,body={}){
        return this.method.post(url,body)
    }
    async delete(url:string){
        return this.method.delete(url)
    }
}
export default new methods()