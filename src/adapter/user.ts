import { AppDataSource } from '../repository/app_data_DB'
import { UserModel } from '../server/model';
import { User } from "../repository/User";

export function AppDataSources()  {
    return AppDataSource.getRepository(User)
}

export function ShowUserID(id: number) {
    const userADS = AppDataSource.getRepository(User)
    return userADS.findOne({where: {id: Number(id)}})
}

export function ShowUserEmail(email: string) {
    const userADS = AppDataSource.getRepository(User)
    return userADS.findOne({where: {email: String(email)}})
}

export function ShowUserUsername(username: string) {
    const userADS = AppDataSource.getRepository(User)
    return userADS.findOne({where: {username: String(username)}})
}

export function SaveUser(user: UserModel) {
    const userADS = AppDataSource.getRepository(User)
    const userCreate = userADS.create({
            username: user.username,
            email: user.email,
            password: user.password,
            status: user.status || 'user'
    })

    return userADS.save(userCreate)
}

export function UpdateUsers(user: UserModel, usernew: UserModel){
    const userADS = AppDataSource.getRepository(User)
    const merge = userADS.merge(user, usernew)
    return userADS.save(merge)
}

export function DeleteUsers(id: Number) {
    return AppDataSource.getRepository(User).delete(String(id))
}
