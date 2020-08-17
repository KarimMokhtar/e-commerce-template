export const addItemToCart = (cartItems, item) =>{
    const existingItem = cartItems.find(ele => ele.id === item.id)

    if(existingItem){
        return cartItems.map(ele=> ele.id === item.id ? 
            { ...ele, quantity: ele.quantity+ 1} : ele)
    }
    return [...cartItems, {...item, quantity:1}]
}