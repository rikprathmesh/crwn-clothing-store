import React, { useContext } from "react";

import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles";
// import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";

import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} CartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
