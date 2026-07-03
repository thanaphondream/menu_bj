import { AppDataSource } from "../repository/app_data_DB";
import { MenuItem } from "../repository/MenuItem";
import { MenuItemsModel } from "../server/model";


export function MenuitemSave(menuitem: MenuItemsModel) {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    const menuiterCreate = menuitemADS.create({
         name: menuitem.name,
        description: menuitem.description || "-",
        image: menuitem.image,
        price: menuitem.price,
        
        user: {
            id: menuitem.userId
        },

        category: {
            id: menuitem.categoryId
        }
    })

    return menuitemADS.save(menuiterCreate)
}


export function MenuItemShows() {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    return  menuitemADS.find()
}

export function MenuItemShowDataID(id: Number) {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    return menuitemADS.findOne({where: {id: Number(id)}})
}

export function MenuItemUpdates(menu: MenuItemsModel, menunew: MenuItemsModel) {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    const menuitemMerge = menuitemADS.merge(menu, menunew)
    return menuitemADS.save(menuitemMerge)
}

export function MenuItemNew() {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    return menuitemADS.find({
          order: {
            id: "DESC"
        },
        take: 10
    })
}