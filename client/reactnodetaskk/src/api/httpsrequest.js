//import { BASE_URL } from "./base_URL";
import axios from "axios";

// get alldatas

export const getAlldatas = async()=>{
    let globalData;
    await axios.get(`http://localhost:7070/api/suppliers`)
    .then(res=>{
        globalData=res.data
    })
    return globalData
}

//get allDatas by ID

export const getAlldatasbyID = async(id)=>{
    let globalData;
    await axios.get(`http://localhost:7070/api/suppliers/${id}`)
    .then(res=>{
        globalData=res.data
    })
    return globalData
}

 //delete datas by ID

export const deleteDatasByID = id=>{
    axios.delete(`http://localhost:7070/api/suppliers/${id}`)
}

//POST PRODUCT
export const postDatas = (payload)=>{
    axios.post(`http://localhost:7070/api/suppliers`,payload);
}
 //PUT PRODUCT
// export const putDatas = (updatedProduct,id)=>{
//     axios.put(`http://localhost:3000/products/${id}`,updatedProduct);
// }