import axios, { AxiosResponse } from "axios";
import { IProducts } from ".././models/InvOrderModels/IProducts";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T> (url:string, body:{}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url:string, body:{}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url:string) => axios.delete<T>(url).then(responseBody),
}

const Products = {
    list: () => requests.get<IProducts[]>('/products')
}

const Orders = {
    postOrder: (order:any) => requests.post<void>('/orders', order)
}

const agent = {
    Products,
    Orders
}

export default agent;