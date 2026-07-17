import { Request, Response } from "express";
import { AddressSave, AddressGetID, AddressCheckData, UpdateAddress, AddressShowAll_ThisUser, AddressGetIDStatus } from "../adapter/addRes";
import { AddressModel } from "./model";
import { AuthRequest } from "../@types/expree"
import { User } from "../repository/User";

type fundAddressModel = (addressmodel: any) => AddressModel

const AddresModels: fundAddressModel = (addressmodel) => {
    const amodel: AddressModel = addressmodel
    return amodel
}

// export const AddresPost = async(req: AuthRequest, res: Response) => {
//     try{
//         const {address, phone, lat, lng, username,home, distance, description, status} = req.body

//         const adr: any = {address, phone, lat, lng, description, username, home, distance, status, user: {id: Number(req.user.id)}}
//         const addressmode = AddresModels(adr)
//         const addressUserId = await AddressGetID(Number(addressmode.user?.id))

//         if(!addressUserId){
//             const addressSave = await AddressSave(addressmode)
//             if(!addressSave){
//                 return res.status(401).json({message: "Error Save not fount"})
//             }
//             return res.status(200).json({message: "Save Data This Ok"})
//         }

//         const addresscheck = await AddressCheckData(addressmode)
//         if(!addresscheck){
//             const adrs = AddresModels(addressUserId)
//             await UpdateAddress(adrs, addressmode)
//             return res.status(201).json({message: "Update This OK"})
//         }

//         return res.status(200).json({message: "Data Address This OK"})
//     }catch(err){
//         return res.status(500).json({message: "Error Status 500"})
//     }
// }


export const AddresPost = async(req: AuthRequest, res: Response) => {
    try{
        const {address, phone, lat, lng, username,home, distance, description, status} = req.body

        const adr: any = {address, phone, lat, lng, description, username, home, distance, status, user: {id: Number(req.user.id)}}
        const addressmode = AddresModels(adr)

        const addressGet = await AddressGetIDStatus(Number(addressmode.user?.id))
        if(!addressGet){
             const addressSave = await AddressSave(addressmode)
            if(!addressSave){
                return res.status(401).json({message: "Error Save not fount"})
            }

            return res.status(200).json({message: "Save Data This Ok"})
        }

        let adrs = AddresModels(addressGet)

        adrs.status = false;

        await UpdateAddress(AddresModels(addressGet), adrs)

        const addressSave = await AddressSave(addressmode)
            if(!addressSave){
                return res.status(401).json({message: "Error Save not fount"})
            }

        return res.status(200).json({message: "Save Data This Ok"})

    }catch(err){
        return res.status(500).json({message: "Error Status 500", err: err})
    }
}

export const AddressGetId = async (req: AuthRequest, res: Response) => {
    try{
        const addressUserId = await AddressGetID(Number(req.user.id))
        if(!addressUserId){
            return res.status(401).json({message: "Error not fount"})
        }
        const addressmodel: any= {
            id: Number(addressUserId.id),
            address: addressUserId.address, 
            username: addressUserId.username,
            phone: addressUserId.phone,
            lng: addressUserId.lng,
            lat: addressUserId.lat,
            description: addressUserId.description,
            home: addressUserId.home,
            distance: addressUserId.distance,
            user: {
                id: Number(addressUserId.user?.id)
            }
        }
        const address = AddresModels(addressmodel)
        return res.status(200).json({message: address})
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const AddressGetAll_User = async (req: AuthRequest, res: Response) => {
    try{
        const userId = Number(req.user.id)
        const addres: any = await AddressShowAll_ThisUser(userId)
        if(!addres){
            return res.status(401).json({message: "Erorr not fount Address"})
        }
        
        return res.status(200).json(addres)
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}