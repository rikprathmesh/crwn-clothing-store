import React, {useContext} from 'react'

import { CartContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';
// import './cart-icon.styles.scss';

import { CartContext } from '../../context/cart.context';

const CartIcon = () => {

  const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <CartContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount>{cartCount}</ItemCount>
    </CartContainer>
  )
}

export default CartIcon
