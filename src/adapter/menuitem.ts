import { AppDataSource } from "../repository/app_data_DB";
import { MenuItem, MenuImage } from "../repository/MenuItem";
import { MenuItemsModel } from "../server/model";


export function MenuitemSave(menu: MenuItemsModel) {
    const repo = AppDataSource.getRepository(MenuItem)
      const item = repo.create({

        name: menu.name,

        description: menu.description,

        price: menu.price,

        image: menu.image,

        user: {
            id: menu.userId
        },

        category: {
            id: menu.categoryId
        },

        images: menu.images?.map(url => ({
            imageUrl: url
        }))
    });

    return repo.save(item)
}


export function MenuItemShows() {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    return  menuitemADS.find()
}

export function MenuItemShowDataID(id: Number) {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    return menuitemADS.findOne({
        where: {id: Number(id)},
        relations: {
            images: true
        }
    })
}

// export function MenuItemUpdates(menu: MenuItemsModel, menunew: MenuItemsModel) {
//     const menuitemADS = AppDataSource.getRepository(MenuItem)
//     const menuitemMerge = menuitemADS.merge(menu, menunew)
//     return menuitemADS.save(menuitemMerge)
// }

export function MenuItemNew() {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    return menuitemADS.find({
          order: {
            id: "DESC"
        },
        take: 10
    })
}


export function MenutemTopNew(skip: number, limit: number) {
    const menuitemADS = AppDataSource.getRepository(MenuItem)
    return menuitemADS.findAndCount({
            skip,
            take: limit,
            order: {
                id: "DESC"
            }
        })
}

export function MenutemImgSave(img: string, id: number){
    const menuitemADS = AppDataSource.getRepository(MenuImage)
    const ImgMenuCreate = menuitemADS.create({
        imageUrl: img,
        menu: {id: Number(id)}
    })

    return menuitemADS.save(ImgMenuCreate)
}
