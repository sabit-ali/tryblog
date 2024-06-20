import axios from "axios"

const getData = async ()=>{
    const res =  await fetch(`api/get-koko`)
    if(!res.ok){
        throw new Error('get koko Error')
    }
    return res.json()
}

export const getSingleProduct = async (_id:number)=>{
    const products = await getData()
    const item = await products.find((product:any)=> product._id === _id)
    return item
    
}