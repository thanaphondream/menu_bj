import { AppDataSource } from "../repository/app_data_DB";
import { Category } from "../repository/Category";

const categoryADS = AppDataSource.getRepository(Category)

export function CategoryPosts(name: string) {
    const categoryCreat = categoryADS.create({name: name})
    return categoryADS.save(categoryCreat)
}

export function CategoryFintANDMenu(id: number) {
    return categoryADS.createQueryBuilder("category")
    .leftJoinAndSelect(
        "category.menus",
        "menu"
    )
    .where("category.id = :id", {
        id: 1
    })
    .getOne();
}

export function CategoryFindANdMenu() {
    return categoryADS.find()
}

export function CategoryId(id: number){
    return categoryADS.findOne({
        where: {
            id: id
        }
    })
}

export function CategoryUpdates(category: any, categorynew: any) {
    const categorymerge = categoryADS.merge(category, categorynew)
    return categoryADS.save(categorymerge)
}