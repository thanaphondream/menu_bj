import { AppDataSource } from "../repository/app_data_DB";
import { Driver } from "../repository/Driver";
import { Request, Response } from "express";

export const driverPost = async (req: Request, res: Response) => {
    try{
        // const {name, phone, vehicle} = req.body
        const repo = await AppDataSource.getRepository(Driver)
        const divers= await repo.create({
            name: "Dream",
            phone: "0647658222",
            vehicle: "จักรยานยน",
            status: "offline"
        })

        const diverssave = await repo.save(divers)

        return res.json("SAVE This OK")
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}