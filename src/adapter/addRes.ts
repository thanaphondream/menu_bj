import { AppDataSource } from "../repository/app_data_DB";
import { Address } from "../repository/Adddress";
import { AddressModel } from "../server/model";

const addressADS = AppDataSource.getRepository(Address)

export function AddressSave(address: AddressModel) {
    
    const addressCreate = addressADS.create({
        address: address.address,
        phone: address.phone,
        lat: address.lat,
        lng: address.lng,
        username: address.username,
        description: address.description,
        home: address.home,
        distance: address.distance,
        user:{
            id: Number(address.user?.id)
        }
    })

    return addressADS.save(addressCreate)
}

export function AddressGetID(userId: Number){
    return addressADS.findOne({
        where: {
            user: {
                id: Number(userId)
            }
        },relations: {user: true}
    })
}

export function AddressCheckData(address: AddressModel){
    return addressADS.findOne({
        where: {
            address: address.address,
            phone: address.phone,
            lat: address.lat,
            lng: address.lng,
            username: address.username,
            description: address.description,
            home: address.home,
            distance: address.distance,
            user: {
                id: Number(address.user?.id)
            }
        }
    })
}

export function UpdateAddress(address: AddressModel, addressnew: AddressModel){
    const merge = addressADS.merge(address, addressnew)
    return addressADS.save(merge)
}