import { AppDataSource } from "../repository/app_data_DB";
import { Cart, CartItem } from "../repository/Cart";

const CartADS = AppDataSource.getRepository(Cart)
const CartItemADS = AppDataSource.getRepository(CartItem)

export function CartFinID(userId: number) {
    return CartADS.findOne({
        where:{
            user: {id: userId}
        },
        relations: {
            items: {
                menuItem: true
            }
        }
    })
}

export function CartSaves(userId: number) {
    const cartcreate = CartADS.create({
        user: { id: userId } as any,
    });

    return CartADS.save(cartcreate)
}

export function CartItemFindOne(cartId: Number, menutiemId: Number) {
    return CartItemADS.findOne({
        where:{
            cart: {id: Number(cartId)},
            menuItem: {id: Number(menutiemId)}
        },
        relations: {
            cart: true,
            menuItem: true
        }
    })
}

export async function CartItemUpdate(CartItem: any){
    await CartItemADS.save(CartItem)
}

export function CartItmeSave(cartId: Number, menuId: Number, quantity: Number){
    const newItme = CartItemADS.create({
        cart: {id: Number(cartId)} as any,
        menuItem: {id: Number(menuId)} as any,
        quantity: Number(quantity) || 1
    })

    return CartItemADS.save(newItme)
}

export function CartFinIDOnd (id: Number) {
    return CartItemADS.findOne({where: {id: Number(id)}})
}

export function CartItmeDelete(id: Number){
    return CartItemADS.delete(Number(id))
}

export function CartFinIDS(userId: number) {
    return CartADS.findOne({
        where:{
            user: {id: userId}
        },
        relations: {
            items: {
                menuItem: true
            }
        },order: {
            items: {id: "DESC"}
        }
    })
}

export function CartAndCartitme_Delete(id: number){
    return CartItemADS.delete({
        cart: {
            id: id
        }
    })
}