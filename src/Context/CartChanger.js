import React, { createContext, useState } from 'react'

export const Cart = createContext(true);

const CartChanger = ({children}) => {
    const [isChange, setIsChange] = useState(true)
    return (
        <Cart.Provider value={{ isChange, setIsChange }}>
            {children}
        </Cart.Provider>
    )
}

export default CartChanger
